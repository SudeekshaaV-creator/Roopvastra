import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

function customizationApiPlugin(): Plugin {
  const setupMiddlewares = (server: any) => {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      const url = req.url?.split('?')[0];

      if (
        req.method === 'POST' &&
        (url === '/api/custom-request' ||
          url === '/api/payment/create-order' ||
          url === '/api/payment/verify-signature')
      ) {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');

            if (url === '/api/custom-request') {
              delete require.cache[require.resolve('./server/emailService.cjs')];
              const { handleCustomizationRequest } = require('./server/emailService.cjs');
              const result = await handleCustomizationRequest(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Customization request received and email sent.',
                  messageId: result.messageId,
                })
              );
              return;
            }

            if (url === '/api/payment/create-order') {
              delete require.cache[require.resolve('./server/razorpayService.cjs')];
              const { createRazorpayOrder } = require('./server/razorpayService.cjs');
              const result = await createRazorpayOrder({
                amountInRupees: Number(data.amount),
                currency: data.currency || 'INR',
                receipt: data.receipt,
                notes: data.notes,
              });
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
              return;
            }

            if (url === '/api/payment/verify-signature') {
              delete require.cache[require.resolve('./server/razorpayService.cjs')];
              const { verifyPaymentSignature } = require('./server/razorpayService.cjs');
              const result = await verifyPaymentSignature({
                razorpay_order_id: data.razorpay_order_id,
                razorpay_payment_id: data.razorpay_payment_id,
                razorpay_signature: data.razorpay_signature,
                customerDetails: data.customerDetails,
                items: data.items,
                totalAmount: data.totalAmount,
              });
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
              return;
            }
          } catch (err: any) {
            console.error('[API ERROR]', err.message);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = err.message.includes('signature') ? 400 : 500;
            res.end(
              JSON.stringify({
                success: false,
                error: err.message || 'Internal server error.',
              })
            );
          }
        });
      } else {
        next();
      }
    });
  };

  return {
    name: 'customization-api-plugin',
    configureServer(server) {
      setupMiddlewares(server);
    },
    configurePreviewServer(server) {
      setupMiddlewares(server);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), customizationApiPlugin()],
  server: {
    port: 3000,
    open: false
  }
});

