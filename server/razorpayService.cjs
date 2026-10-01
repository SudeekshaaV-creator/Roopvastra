const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Safe .env loader ensuring current environment variables are always fresh
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
          process.env[key] = val;
        }
      }
    });
  }
}

loadEnv();

function getCredentials() {
  loadEnv();
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay Test credentials are missing in server environment (.env).');
  }

  return { keyId, keySecret };
}

/**
 * Creates a Razorpay Order via Razorpay Test REST API
 * @param {Object} params
 * @param {number} params.amountInRupees - Total amount in INR (e.g., 990 for ₹990)
 * @param {string} [params.currency='INR']
 * @param {string} [params.receipt]
 * @param {Object} [params.notes]
 */
async function createRazorpayOrder({ amountInRupees, currency = 'INR', receipt, notes = {} }) {
  const { keyId, keySecret } = getCredentials();

  if (!amountInRupees || typeof amountInRupees !== 'number' || amountInRupees <= 0) {
    throw new Error('Valid positive amountInRupees is required to create a Razorpay order.');
  }

  const amountInPaise = Math.round(amountInRupees * 100);

  const payload = JSON.stringify({
    amount: amountInPaise,
    currency,
    receipt: receipt || `rcpt_${Date.now()}`,
    notes: {
      store: 'ROOP VASTRA Sathyamangalam',
      ...notes
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.razorpay.com',
      path: '/v1/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              success: true,
              orderId: data.id,
              amount: data.amount, // in paise
              currency: data.currency,
              keyId // safe public test key ID returned to frontend
            });
          } else {
            console.error('[RAZORPAY ORDER API ERROR]', data);
            reject(new Error(data.error ? data.error.description : 'Failed to create Razorpay order.'));
          }
        } catch (e) {
          reject(new Error('Invalid response format from Razorpay server.'));
        }
      });
    });

    req.on('error', (err) => {
      console.error('[RAZORPAY REQUEST NETWORK ERROR]', err.message);
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Verifies Razorpay payment signature server-side using HMAC SHA256
 * @param {Object} params
 * @param {string} params.razorpay_order_id
 * @param {string} params.razorpay_payment_id
 * @param {string} params.razorpay_signature
 * @param {Object} [params.customerDetails]
 * @param {Array} [params.items]
 * @param {number} [params.totalAmount]
 */
async function verifyPaymentSignature({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  customerDetails = {},
  items = [],
  totalAmount = 0
}) {
  const { keySecret } = getCredentials();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new Error('Missing required payment verification parameters (order_id, payment_id, signature).');
  }

  const text = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(text)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const receivedBuffer = Buffer.from(razorpay_signature, 'utf8');

  const isValid = expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!isValid) {
    console.error('[SIGNATURE VERIFICATION FAILED] Cryptographic signature mismatch for order:', razorpay_order_id);
    throw new Error('Cryptographic signature verification failed. Tampered or illegitimate payment.');
  }

  // Backup verified order receipt locally
  try {
    const ordersDir = path.resolve(process.cwd(), 'server', 'orders');
    if (!fs.existsSync(ordersDir)) {
      fs.mkdirSync(ordersDir, { recursive: true });
    }
    const orderRecord = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      verified: true,
      status: 'PAID',
      verifiedAt: new Date().toISOString(),
      customer: customerDetails,
      items,
      totalAmount
    };
    const orderFile = path.join(ordersDir, `order_${Date.now()}_${razorpay_order_id}.json`);
    fs.writeFileSync(orderFile, JSON.stringify(orderRecord, null, 2));
  } catch (err) {
    console.warn('[ORDER BACKUP WARNING]', err.message);
  }

  return {
    success: true,
    verified: true,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    message: 'Payment signature verified successfully. Order marked as PAID.'
  };
}

module.exports = {
  createRazorpayOrder,
  verifyPaymentSignature,
  getCredentials
};
