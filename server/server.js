const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { validateBulkEmails, validateSingleEmail } = require('./services/emailValidator');

// Load environment variables from .env file if available
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS & JSON Parsing
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'CekGmail Live Checker System'
  });
});

// In-memory cache for credits from last real check
let cachedCredits = {
  api_credits_remaining: null,
  subscription_credits_remaining: null
};

app.get('/api/netnit-credits', (req, res) => {
  return res.json({
    success: true,
    message: 'Netnit API Ready',
    subscription_credits_remaining: cachedCredits.subscription_credits_remaining,
    api_credits_remaining: cachedCredits.api_credits_remaining
  });
});
 * Netnit API Proxy Endpoint (/api/netnit-check)
 * Accepts:
 * - mail: string[]
 * - checkType: 'fastcheck' | 'deepcheck'
 * - apiKey?: string (optional override)
 */
app.post('/api/netnit-check', async (req, res) => {
  try {
    const { mail, checkType = 'deepcheck' } = req.body;
    const apiKey = req.headers.authorization?.replace('Bearer ', '') || req.body.apiKey || process.env.NETNIT_API_KEY || 'netnit_tkPMvN0vEYAVt2E2jUFAscKOfC0hB3Ye';

    if (!Array.isArray(mail) || mail.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Field "mail" is required and must be a non-empty array of email addresses.'
      });
    }

    const endpoint = checkType === 'fastcheck' ? 'fastcheck' : 'deepcheck';
    const targetUrl = `https://apikey.netnit.net/${endpoint}`;

    const apiRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ mail })
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      return res.status(apiRes.status).json({
        success: false,
        message: `Netnit API returned error status ${apiRes.status}`,
        details: errorText
      });
    }

    const resData = await apiRes.json();
    let results = [];
    let subscription_credits_remaining = null;
    let api_credits_remaining = null;

    if (Array.isArray(resData)) {
      results = resData;
    } else if (resData && typeof resData === 'object') {
      results = resData.results || [];
      subscription_credits_remaining = resData.subscription_credits_remaining;
      api_credits_remaining = resData.api_credits_remaining;
      if (api_credits_remaining !== null && api_credits_remaining !== undefined) {
        cachedCredits.api_credits_remaining = api_credits_remaining;
      }
      if (subscription_credits_remaining !== null && subscription_credits_remaining !== undefined) {
        cachedCredits.subscription_credits_remaining = subscription_credits_remaining;
      }
    }

    return res.json({
      success: true,
      results,
      subscription_credits_remaining,
      api_credits_remaining
    });
  } catch (error) {
    console.error('Error in /api/netnit-check:', error);
    return res.status(500).json({
      success: false,
      message: 'Server failed to proxy request to Netnit API.',
      error: error.message
    });
  }
});


/**
 * Main Email Validation Endpoint
 * Accepts:
 * - { emails: string[] }
 * - { text: string } (raw newline/comma separated text)
 * - { email: string }
 */
app.post('/api/validate-email', async (req, res) => {
  try {
    let emailArray = [];
    const fastCheck = Boolean(req.body.fastCheck);

    if (Array.isArray(req.body.emails)) {
      emailArray = req.body.emails;
    } else if (typeof req.body.text === 'string') {
      // Split by newlines, commas, or semicolons
      emailArray = req.body.text
        .split(/[\n,;]+/)
        .map(e => e.trim())
        .filter(Boolean);
    } else if (typeof req.body.email === 'string') {
      emailArray = [req.body.email];
    }

    if (!emailArray || emailArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Daftar email tidak boleh kosong. Harap kirimkan array "emails" atau string "text".'
      });
    }

    // Limit maximum bulk items to prevent memory exhaustion in single request
    if (emailArray.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Batas maksimum per pengujian adalah 1000 alamat email sekaligus.'
      });
    }

    const { summary, results } = await validateBulkEmails(emailArray, 10, fastCheck);

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary,
      results
    });
  } catch (error) {
    console.error('Error validating emails:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat melakukan validasi email.',
      error: error.message
    });
  }
});

/**
 * Checkmail.live Standard API Endpoint (/check/ and /api/check)
 * Accepts:
 * {
 *   "api_key": "2028c1dfb52d0e8d3bf6308eec55f10f",
 *   "emails": ["example1@gmail.com", "example2@gmail.com"],
 *   "fastCheck": true
 * }
 */
const checkmailHandler = async (req, res) => {
  try {
    let emailArray = [];
    const fastCheck = Boolean(req.body.fastCheck);

    if (Array.isArray(req.body.emails)) {
      emailArray = req.body.emails;
    } else if (typeof req.body.text === 'string') {
      emailArray = req.body.text.split(/[\n,;]+/).map(e => e.trim()).filter(Boolean);
    }

    if (!emailArray || emailArray.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'Parameter "emails" is required and cannot be empty.',
        data: []
      });
    }

    const { results } = await validateBulkEmails(emailArray, 10, fastCheck);

    const formattedData = results.map((r, idx) => ({
      email: r.email,
      status: r.checkmailStatus, // 'live' | 'die' | 'verify_phone' | 'not_exist' | 'error'
      index: idx + 1
    }));

    return res.json({
      status: true,
      message: 'Get data successfully',
      data: formattedData
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: []
    });
  }
};

app.post('/check/', checkmailHandler);
app.post('/api/check', checkmailHandler);


// Serve frontend dist static files if building for production
const distPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Email Validation Server running on port ${PORT}`);
  console.log(`🌐 API Endpoint: http://localhost:${PORT}/api/validate-email`);
  console.log(`====================================================`);
});
