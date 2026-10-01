const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Safe .env loader without requiring external dependencies
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

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'sudeekshaav2004@gmail.com';

function checkEmailConfig() {
  const isSmtpConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const isResendConfigured = Boolean(process.env.RESEND_API_KEY);
  return { isSmtpConfigured, isResendConfigured, isConfigured: isSmtpConfigured || isResendConfigured };
}

function getTransporter() {
  const config = checkEmailConfig();

  if (config.isSmtpConfigured) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // If no SMTP or API key is configured, return null so we don't falsely claim email was sent
  return null;
}

async function handleCustomizationRequest(data) {
  if (!data || !data.fullName || !data.mobileNumber || !data.emailAddress || !data.designRequirements) {
    throw new Error('Missing required fields: fullName, mobileNumber, emailAddress, designRequirements');
  }

  // Backup request locally first so customer data is NEVER lost
  try {
    const storageDir = path.resolve(process.cwd(), 'server', 'sent_emails');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    const logPath = path.join(storageDir, `custom_req_${Date.now()}.json`);
    fs.writeFileSync(logPath, JSON.stringify({
      recipient: OWNER_EMAIL,
      data: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        emailAddress: data.emailAddress,
        outfitType: data.outfitType,
        selectedMaterial: data.selectedMaterial,
        preferredColour: data.preferredColour,
        customizationRequirement: data.customizationRequirement,
        referenceFileName: data.referenceFileName,
        designRequirements: data.designRequirements,
        submittedAt: data.submittedAt || new Date().toISOString()
      },
      receivedAt: new Date().toISOString()
    }, null, 2));
  } catch (err) {
    console.warn('[EMAIL SERVICE] Backup log warning:', err.message);
  }

  const emailConfig = checkEmailConfig();
  if (!emailConfig.isConfigured) {
    console.error(`[EMAIL SERVICE ERROR] Cannot send email to ${OWNER_EMAIL}: No SMTP or API credentials configured in .env.`);
    throw new Error('Email service not configured. Missing SMTP_USER / SMTP_PASS or API key in .env. Request was preserved in local backup.');
  }

  const transporter = getTransporter();

  const textBody = `New Roop Vastra Customization Request

Customer Contact:
- Full Name: ${data.fullName}
- Mobile Number: ${data.mobileNumber}
- Email Address: ${data.emailAddress}

Customization Specifications:
- Outfit Type: ${data.outfitType || 'Not specified'}
- Selected Material: ${data.selectedMaterial || 'Not specified'}
- Preferred Colour: ${data.preferredColour || 'As per material'}
- Customization / Rework Requirement: ${data.customizationRequirement || 'Not specified'}
- Reference Image: ${data.referenceFileName || 'None provided'}

Design Requirements:
${data.designRequirements}

Submitted At: ${data.submittedAt || new Date().toISOString()}
Location: Sathyamangalam Boutique Atelier
`;

  const htmlBody = `
    <div style="font-family: 'Playfair Display', Georgia, serif; max-width: 620px; margin: 0 auto; border: 2px solid #D4AF37; padding: 28px; background-color: #FAF7F2; color: #24160F; border-radius: 12px;">
      <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 16px; margin-bottom: 20px;">
        <h1 style="color: #6A1B29; margin: 0; font-size: 24px; letter-spacing: 1px;">ROOP VASTRA</h1>
        <p style="color: #8C6D37; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 4px 0 0 0;">Tradition Woven with Elegance • Sathyamangalam</p>
      </div>

      <h2 style="color: #6A1B29; font-size: 18px; margin-top: 0; margin-bottom: 16px; font-weight: 600;">
        New Roop Vastra Customization Request
      </h2>

      <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 13px; margin-bottom: 20px;">
        <tbody>
          <tr style="background-color: #F5EEDB;">
            <td style="padding: 10px 12px; font-weight: bold; width: 40%; color: #4A3328;">Full Name</td>
            <td style="padding: 10px 12px; color: #170E09; font-weight: 600;">${escapeHtml(data.fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #4A3328;">Mobile Number</td>
            <td style="padding: 10px 12px; color: #170E09;"><a href="tel:${escapeHtml(data.mobileNumber)}" style="color: #6A1B29; text-decoration: none; font-weight: bold;">${escapeHtml(data.mobileNumber)}</a></td>
          </tr>
          <tr style="background-color: #F5EEDB;">
            <td style="padding: 10px 12px; font-weight: bold; color: #4A3328;">Email Address</td>
            <td style="padding: 10px 12px; color: #170E09;"><a href="mailto:${escapeHtml(data.emailAddress)}" style="color: #6A1B29; text-decoration: none;">${escapeHtml(data.emailAddress)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #4A3328;">Outfit Type</td>
            <td style="padding: 10px 12px; color: #170E09; font-weight: bold;">${escapeHtml(data.outfitType || 'Not specified')}</td>
          </tr>
          <tr style="background-color: #F5EEDB;">
            <td style="padding: 10px 12px; font-weight: bold; color: #4A3328;">Selected Material</td>
            <td style="padding: 10px 12px; color: #170E09;">${escapeHtml(data.selectedMaterial || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #4A3328;">Preferred Colour</td>
            <td style="padding: 10px 12px; color: #170E09;">${escapeHtml(data.preferredColour || 'As per material')}</td>
          </tr>
          <tr style="background-color: #F5EEDB;">
            <td style="padding: 10px 12px; font-weight: bold; color: #4A3328;">Customization / Rework</td>
            <td style="padding: 10px 12px; color: #170E09; font-weight: 600;">${escapeHtml(data.customizationRequirement || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #4A3328;">Reference Image</td>
            <td style="padding: 10px 12px; color: #170E09;">${escapeHtml(data.referenceFileName || 'None provided')}</td>
          </tr>
        </tbody>
      </table>

      <div style="background-color: #FFFFFF; border-left: 4px solid #6A1B29; padding: 16px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #6A1B29; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Design Requirements:</h4>
        <p style="margin: 0; white-space: pre-wrap; font-family: sans-serif; font-size: 13px; line-height: 1.6; color: #2C2C2C;">${escapeHtml(data.designRequirements)}</p>
      </div>

      <div style="text-align: center; border-top: 1px solid #D4AF37; padding-top: 14px; font-size: 11px; color: #666; font-family: sans-serif;">
        <p style="margin: 2px 0;">This email was securely delivered to <strong>${OWNER_EMAIL}</strong> via Roop Vastra Bespoke Atelier.</p>
        <p style="margin: 2px 0;">Boutique Pavilion, Main Bazaar Road, Sathyamangalam - 638401, Tamil Nadu, India</p>
      </div>
    </div>
  `;

  let dispatchedMessageId = null;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const resendPayload = {
      from: process.env.RESEND_FROM_EMAIL || 'Roop Vastra <onboarding@resend.dev>',
      to: [OWNER_EMAIL],
      subject: 'New Roop Vastra Customization Request',
      text: textBody,
      html: htmlBody
    };

    if (data.referenceFileData && data.referenceFileName) {
      const matches = String(data.referenceFileData).match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        resendPayload.attachments = [
          {
            filename: data.referenceFileName,
            content: Buffer.from(matches[2], 'base64')
          }
        ];
      }
    }

    const resendResult = await resend.emails.send(resendPayload);
    if (resendResult.error) {
      console.error('[RESEND API ERROR]', resendResult.error);
      throw new Error(`Resend email delivery failed: ${resendResult.error.message || JSON.stringify(resendResult.error)}`);
    }
    dispatchedMessageId = resendResult.data ? resendResult.data.id : `resend-${Date.now()}`;
    console.log(`[RESEND SUCCESS] Email successfully dispatched to ${OWNER_EMAIL}. ID: ${dispatchedMessageId}`);
  } else if (transporter) {
    const mailOptions = {
      from: '"Roop Vastra Bespoke Concierge" <concierge@roopvastra.com>',
      to: OWNER_EMAIL,
      subject: 'New Roop Vastra Customization Request',
      text: textBody,
      html: htmlBody
    };

    // Optional attachment if reference image base64 data provided
    if (data.referenceFileData && data.referenceFileName) {
      const matches = String(data.referenceFileData).match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        mailOptions.attachments = [
          {
            filename: data.referenceFileName,
            content: Buffer.from(matches[2], 'base64'),
            contentType: matches[1]
          }
        ];
      }
    }

    const info = await transporter.sendMail(mailOptions);
    dispatchedMessageId = info.messageId;
    console.log(`[SMTP SUCCESS] Email successfully sent to ${OWNER_EMAIL}. ID: ${dispatchedMessageId}`);
  } else {
    throw new Error('No email provider is configured. Please configure RESEND_API_KEY in .env.');
  }

  // Safely store backup copy in server/sent_emails/
  try {
    const storageDir = path.resolve(process.cwd(), 'server', 'sent_emails');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    const logPath = path.join(storageDir, `custom_req_${Date.now()}.json`);
    fs.writeFileSync(logPath, JSON.stringify({
      messageId: dispatchedMessageId,
      recipient: OWNER_EMAIL,
      provider: process.env.RESEND_API_KEY ? 'resend' : 'smtp',
      subject: 'New Roop Vastra Customization Request',
      data: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        emailAddress: data.emailAddress,
        outfitType: data.outfitType,
        selectedMaterial: data.selectedMaterial,
        preferredColour: data.preferredColour,
        customizationRequirement: data.customizationRequirement,
        referenceFileName: data.referenceFileName,
        designRequirements: data.designRequirements,
        submittedAt: data.submittedAt || new Date().toISOString()
      },
      dispatchedAt: new Date().toISOString()
    }, null, 2));
  } catch (err) {
    console.warn('[EMAIL SERVICE] Backup log warning:', err.message);
  }

  return {
    success: true,
    messageId: dispatchedMessageId,
    recipient: OWNER_EMAIL
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  handleCustomizationRequest,
  OWNER_EMAIL
};
