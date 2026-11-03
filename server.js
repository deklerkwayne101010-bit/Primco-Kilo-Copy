import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API endpoint for quote requests
app.post('/api/quote', async (req, res) => {
  try {
    const { customer, delivery, items, reference } = req.body;

    // Format a clean, professional email
    const emailContent = `
PRIMECO SUPPLIES - QUOTE REQUEST
================================

REFERENCE: ${reference || 'N/A'}
DATE: ${new Date().toLocaleString('en-ZA', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

CUSTOMER DETAILS
----------------
Name: ${customer?.name || 'N/A'}
Company/Workshop: ${customer?.company || 'N/A'}
Email: ${customer?.email || 'N/A'}
Phone: ${customer?.phone || 'N/A'}
VAT Number: ${customer?.vatNumber || 'N/A'}

DELIVERY DETAILS
----------------
Address: ${delivery?.address || 'N/A'}
Suburb/City: ${delivery?.suburb || 'N/A'}
Province: ${delivery?.province || 'N/A'}
Postal Code: ${delivery?.postalCode || 'N/A'}
Delivery Notes: ${delivery?.notes || 'N/A'}

QUOTE ITEMS (${items?.length || 0} line(s))
----------------------------------------
${items?.map((item, idx) => `
${idx + 1}. SKU: ${item.sku}
   Product: ${item.product?.name || item.name || 'N/A'}
   Category: ${item.product?.categoryName || item.category || 'N/A'}
   Quantity: ${item.quantity}
   Unit: ${item.product?.unit || 'N/A'}
`).join('\n') || 'No items'}

TOTAL ITEMS: ${items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}

---
This quote request was submitted via the Primeco Supplies website.
Please respond with a formal PDF estimate including trade discounts and delivery ETA.
    `.trim();

    // In a real environment, this would send via email service
    // For now, log the formatted email (clean and professional)
    console.log('\n' + '='.repeat(60));
    console.log('NEW QUOTE REQUEST - EMAIL NOTIFICATION');
    console.log('='.repeat(60));
    console.log(emailContent);
    console.log('='.repeat(60) + '\n');

    res.json({ 
      success: true, 
      reference,
      message: 'Quote request received successfully' 
    });
  } catch (error) {
    console.error('Error processing quote request:', error);
    res.status(500).json({ success: false, error: 'Failed to process quote request' });
  }
});

// Serve static files from dist in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Primeco Supplies server running on port ${PORT}`);
});
