import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Email transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Send quote/order email
app.post('/api/send-quote', async (req, res) => {
  try {
    const { reference, itemCount, items, customer, type } = req.body;

    const itemsHtml = items.map((i: any) => 
      `<tr><td style="padding:8px;border-bottom:1px solid #ddd;">${i.sku}</td><td style="padding:8px;border-bottom:1px solid #ddd;">${i.product?.name || i.sku}</td><td style="padding:8px;border-bottom:1px solid #ddd;text-align:right;">${i.quantity}</td></tr>`
    ).join('');

    const subject = type === 'quick-order' 
      ? `Quick Order Request - ${reference}` 
      : `Quote Request ${reference} - ${itemCount} Items`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:#1a1a1a;padding:20px;border-radius:8px 8px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Primeco Supplies</h1>
          <p style="color:#999;margin:5px 0 0;font-size:12px;">Alberton, Gauteng</p>
        </div>
        <div style="padding:20px;background:#f9f9f9;">
          <h2 style="color:#333;margin-top:0;">New ${type === 'quick-order' ? 'Quick Order' : 'Quote Request'}</h2>
          <p><strong>Reference:</strong> ${reference}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-ZA')}</p>
          <p><strong>Total Items:</strong> ${itemCount}</p>
          ${customer ? `
            <h3 style="color:#333;">Customer Details</h3>
            <p><strong>Name:</strong> ${customer.name}<br>
            <strong>Company:</strong> ${customer.company}<br>
            <strong>Phone:</strong> ${customer.phone}<br>
            <strong>Email:</strong> ${customer.email}</p>
          ` : ''}
          <h3 style="color:#333;">Order Items</h3>
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#eee;">
                <th style="padding:8px;text-align:left;border-bottom:2px solid #ddd;">SKU</th>
                <th style="padding:8px;text-align:left;border-bottom:2px solid #ddd;">Product</th>
                <th style="padding:8px;text-align:right;border-bottom:2px solid #ddd;">Qty</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
        <div style="background:#1a1a1a;padding:15px;border-radius:0 0 8px 8px;text-align:center;">
          <p style="color:#999;margin:0;font-size:12px;">Primeco Supplies &middot; Alberton, Gauteng &middot; +27 (0)11 906 0000</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'sales@primeco.co.za, dean@primeco.co.za',
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:#1a1a1a;padding:20px;border-radius:8px 8px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Primeco Supplies</h1>
        </div>
        <div style="padding:20px;background:#f9f9f9;">
          <h2 style="color:#333;margin-top:0;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          <h3 style="color:#333;">Message</h3>
          <p style="background:#fff;padding:15px;border-radius:4px;">${message}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'sales@primeco.co.za, dean@primeco.co.za',
      subject: `Contact Form - ${name}`,
      html
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Contact email error:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
app.use(express.static('dist'));

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
