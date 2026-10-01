const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleCustomizationRequest, OWNER_EMAIL } = require('./emailService.cjs');
const { createRazorpayOrder, verifyPaymentSignature } = require('./razorpayService.cjs');

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Customization email API endpoint
  if (req.url === '/api/custom-request' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const result = await handleCustomizationRequest(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Customization request received and email sent.',
          messageId: result.messageId
        }));
      } catch (err) {
        console.error('[API ERROR] Failed to process customization request:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Failed to send customization request. Please try again or contact via phone/WhatsApp.'
        }));
      }
    });
    return;
  }

  // Razorpay Create Order Endpoint
  if (req.url === '/api/payment/create-order' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const result = await createRazorpayOrder({
          amountInRupees: Number(data.amount),
          currency: data.currency || 'INR',
          receipt: data.receipt,
          notes: data.notes
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error('[API ERROR] Failed to create Razorpay order:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: err.message || 'Failed to create Razorpay order.'
        }));
      }
    });
    return;
  }

  // Razorpay Signature Verification Endpoint
  if (req.url === '/api/payment/verify-signature' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const result = await verifyPaymentSignature({
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
          customerDetails: data.customerDetails,
          items: data.items,
          totalAmount: data.totalAmount
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error('[API ERROR] Razorpay signature verification failed:', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: err.message || 'Signature verification failed.'
        }));
      }
    });
    return;
  }

  // Health check endpoint
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', ownerEmail: OWNER_EMAIL }));
    return;
  }

  // Static files from dist if built
  const distDir = path.resolve(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      return;
    } catch (e) {
      // ignore
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`[ROOP VASTRA SERVER] Backend running on port ${PORT}`);
  console.log(`[ROOP VASTRA SERVER] Owner recipient: ${OWNER_EMAIL}`);
});

module.exports = server;
