const { google } = require('googleapis');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Configure CORS to allow requests from your React app
const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.1.2:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

const CREDENTIALS_PATH = './credentials.json';
const SPREADSHEET_ID = '16BH268jFA3nCINIRZtTgkTjQIq_O7bDDmn7ZPkOkqvI';
const SHEET_NAME = 'Sheet1';

// Check if credentials file exists
if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.error('❌ ERROR: credentials.json file not found!');
  console.error('Please make sure the file is in the same directory as sheets-backend.cjs');
  process.exit(1);
}

// Load client secrets from a local file.
const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// GET all contacts
app.get('/contacts', async (req, res) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
    });

    const rows = response.data.values || [];
    
    // Skip header row if exists
    const contacts = rows.slice(1).map((row, index) => ({
      id: index + 1,
      name: row[0] || '',
      phone: row[1] || '',
      email: row[2] || '',
      notes: row[3] || ''
    }));

    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST new contact
app.post('/add-contact', async (req, res) => {
  try {
    const { name, phone, email, notes } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and email are required' 
      });
    }

    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
    
    // First, get the current rows to check headers
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
    });

    const rows = getResponse.data.values || [];
    
    // If sheet is empty, add headers
    if (rows.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:D1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Name', 'Phone', 'Email', 'Notes']],
        },
      });
    }

    // Add new contact
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[name, phone, email, notes || '']],
      },
    });

    console.log('✅ Contact added to Google Sheets:', { name, email });
    res.status(200).json({ 
      success: true, 
      message: 'Contact added successfully',
      result: response.data 
    });
  } catch (error) {
    console.error('❌ Error adding contact:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: 'Make sure your Google Sheet is accessible and has the correct permissions' 
    });
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is running!',
    timestamp: new Date().toISOString(),
    endpoints: ['/contacts (GET)', '/add-contact (POST)']
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Sheets backend running on http://localhost:${PORT}`);
  console.log(`📊 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`📞 Contacts endpoint: http://localhost:${PORT}/contacts`);
console.log('\n✅ CORS configured for:');
console.log('   - http://localhost:3000');
console.log('   - http://192.168.1.2:3000');
});