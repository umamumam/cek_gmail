const dns = require('dns').promises;
const dnsBase = require('dns');
const { isDisposableDomain, classifyDomain } = require('../utils/disposableDomains');

// Configure reliable public DNS resolvers (Google & Cloudflare DNS)
try {
  dnsBase.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Fallback to system default if setServers fails
}


// RFC 5322 compliant regex pattern for email format verification
const RFC5322_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/**
 * Validates syntax against RFC 5322 and length standards
 * @param {string} email 
 * @returns {{ isValid: boolean, reason?: string }}
 */
function validateSyntax(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, reason: 'Email tidak boleh kosong' };
  }

  const cleanEmail = email.trim();

  if (cleanEmail.length > 254) {
    return { isValid: false, reason: 'Panjang email melebihi batas (maks 254 karakter)' };
  }

  const parts = cleanEmail.split('@');
  if (parts.length !== 2) {
    return { isValid: false, reason: 'Format email harus mengandung tepat 1 simbol @' };
  }

  const [localPart, domainPart] = parts;

  if (!localPart || localPart.length > 64) {
    return { isValid: false, reason: 'Bagian username sebelum @ tidak valid atau melebihi 64 karakter' };
  }

  if (!domainPart || domainPart.length > 255) {
    return { isValid: false, reason: 'Bagian domain setelah @ tidak valid atau melebihi 255 karakter' };
  }

  if (!domainPart.includes('.')) {
    return { isValid: false, reason: 'Domain tidak memiliki Top-Level Domain (TLD) / titik' };
  }

  const matchesRfc = RFC5322_REGEX.test(cleanEmail);
  if (!matchesRfc) {
    return { isValid: false, reason: 'Gagal standar sintaks RFC 5322' };
  }

  return { isValid: true };
}

/**
 * Lookup MX records with timeout mechanism
 * @param {string} domain 
 * @param {number} timeoutMs 
 * @returns {Promise<{ hasMx: boolean, mxRecords: Array<{ exchange: string, priority: number }>, hasAFallback: boolean, dnsStatus: string }>}
 */
async function checkDnsMx(domain, timeoutMs = 3500) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('DNS Lookup Timeout')), timeoutMs)
  );

  try {
    const mxRecords = await Promise.race([
      dns.resolveMx(domain),
      timeoutPromise
    ]);

    if (mxRecords && mxRecords.length > 0) {
      // Sort by priority ascending (lowest priority number = primary server)
      mxRecords.sort((a, b) => a.priority - b.priority);
      return {
        hasMx: true,
        mxRecords,
        hasAFallback: false,
        dnsStatus: 'MX Active'
      };
    }
  } catch (err) {
    // If MX lookup failed or no MX records, try fallback A/AAAA record resolution (RFC 5321 implicit MX fallback)
    try {
      const aRecords = await Promise.race([
        dns.resolve4(domain),
        timeoutPromise
      ]);
      if (aRecords && aRecords.length > 0) {
        return {
          hasMx: false,
          mxRecords: [],
          hasAFallback: true,
          dnsStatus: 'MX Missing (A Record Exists)'
        };
      }
    } catch (fallbackErr) {
      // Ignore fallback error
    }

    const isTimeout = err.message === 'DNS Lookup Timeout';
    return {
      hasMx: false,
      mxRecords: [],
      hasAFallback: false,
      dnsStatus: isTimeout ? 'DNS Timeout' : 'MX Inactive / Unresolved'
    };
  }

  return {
    hasMx: false,
    mxRecords: [],
    hasAFallback: false,
    dnsStatus: 'No Mail Server Found'
  };
}

/**
 * Validate a single email address
 * @param {string} rawEmail 
 * @returns {Promise<Object>} Detailed validation object
 */
async function validateSingleEmail(rawEmail) {
  const email = (rawEmail || '').trim();

  // 1. Syntax Verification
  const syntaxResult = validateSyntax(email);
  if (!syntaxResult.isValid) {
    return {
      email,
      user: email.includes('@') ? email.split('@')[0] : email,
      domain: email.includes('@') ? email.split('@')[1] : '',
      isValidSyntax: false,
      hasMxRecords: false,
      mxHost: '-',
      isDisposable: false,
      domainType: 'invalid',
      qualityScore: 0,
      status: 'invalid',
      checkmailStatus: 'error',
      reason: syntaxResult.reason,
      checkedAt: new Date().toISOString()
    };

  }

  const [user, domain] = email.split('@');
  const cleanDomain = domain.toLowerCase();

  // 2. Disposable & Domain Classification
  const isDisposable = isDisposableDomain(cleanDomain);
  const domainType = classifyDomain(cleanDomain);

  // 3. DNS MX Lookup
  const dnsResult = await checkDnsMx(cleanDomain);

  // 4. Calculate Hygiene Quality Score & Overall Status
  let qualityScore = 100;
  let status = 'valid'; // 'valid' | 'risky' | 'invalid'
  let checkmailStatus = 'live'; // 'live' | 'die' | 'verify_phone' | 'not_exist' | 'error'
  let reason = 'Email valid dan server mail aktif';

  if (isDisposable) {
    qualityScore -= 70;
    status = 'risky';
    checkmailStatus = 'verify_phone'; // Disposable mail flagged as verify/risky
    reason = 'Email sekali pakai (Disposable Temporary Mail)';
  }

  if (!dnsResult.hasMx) {
    if (dnsResult.hasAFallback) {
      qualityScore -= 40;
      if (status !== 'risky') status = 'risky';
      checkmailStatus = 'verify_phone';
      reason = 'Tidak ada MX record, namun domain memiliki A record (Risiko pengiriman tinggi)';
    } else {
      qualityScore = 0;
      status = 'invalid';
      checkmailStatus = (dnsResult.dnsStatus === 'DNS Timeout') ? 'error' : 'not_exist';
      reason = dnsResult.dnsStatus === 'DNS Timeout'
        ? 'DNS Server Timeout saat mencari server MX'
        : 'Domain tidak memiliki server mail (MX Record) aktif / tidak terdaftar';
    }
  }

  const primaryMxHost = dnsResult.mxRecords.length > 0
    ? `${dnsResult.mxRecords[0].exchange} (Prio: ${dnsResult.mxRecords[0].priority})`
    : (dnsResult.hasAFallback ? 'A Record Fallback' : '-');

  return {
    email,
    user,
    domain: cleanDomain,
    isValidSyntax: true,
    hasMxRecords: dnsResult.hasMx,
    mxHost: primaryMxHost,
    mxRecords: dnsResult.mxRecords,
    isDisposable,
    domainType, // 'public' | 'custom' | 'disposable'
    qualityScore: Math.max(0, qualityScore),
    status,
    checkmailStatus, // 'live' | 'die' | 'verify_phone' | 'not_exist' | 'error'
    reason,
    dnsStatus: dnsResult.dnsStatus,
    checkedAt: new Date().toISOString()
  };
}

/**
 * Validate multiple emails concurrently with rate control
 * @param {Array<string>} emailList 
 * @param {number} concurrency 
 * @param {boolean} fastCheck
 * @returns {Promise<{ summary: Object, results: Array<Object> }>}
 */
async function validateBulkEmails(emailList, concurrency = 10, fastCheck = false) {
  // Sanitize & unique emails
  const cleanList = Array.from(new Set(
    emailList
      .map(e => (typeof e === 'string' ? e.trim() : ''))
      .filter(e => e.length > 0)
  ));

  const results = [];
  const queue = [...cleanList];

  // Adjust concurrency for fastCheck mode
  const activeConcurrency = fastCheck ? Math.min(25, cleanList.length) : Math.min(concurrency, cleanList.length);

  // Helper worker for concurrency execution
  async function worker() {
    while (queue.length > 0) {
      const email = queue.shift();
      if (email) {
        try {
          const res = await validateSingleEmail(email);
          results.push(res);
        } catch (err) {
          results.push({
            email,
            user: email.split('@')[0] || email,
            domain: email.split('@')[1] || '',
            isValidSyntax: false,
            hasMxRecords: false,
            mxHost: '-',
            isDisposable: false,
            domainType: 'invalid',
            qualityScore: 0,
            status: 'invalid',
            checkmailStatus: 'error',
            reason: `Error internal validasi: ${err.message}`,
            checkedAt: new Date().toISOString()
          });
        }
      }
    }
  }

  const workers = Array.from({ length: activeConcurrency }, () => worker());
  await Promise.all(workers);

  // Compute Summary Statistics with checkmail.live categories
  const summary = {
    total: results.length,
    validSyntax: results.filter(r => r.isValidSyntax).length,
    mxActive: results.filter(r => r.hasMxRecords).length,
    disposable: results.filter(r => r.isDisposable).length,
    publicDomains: results.filter(r => r.domainType === 'public').length,
    customDomains: results.filter(r => r.domainType === 'custom').length,
    validStatus: results.filter(r => r.status === 'valid').length,
    riskyStatus: results.filter(r => r.status === 'risky').length,
    invalidStatus: results.filter(r => r.status === 'invalid').length,

    // Checkmail.live compatible metrics
    live: results.filter(r => r.checkmailStatus === 'live').length,
    disable: results.filter(r => r.checkmailStatus === 'die').length,
    verify: results.filter(r => r.checkmailStatus === 'verify_phone').length,
    unregistered: results.filter(r => r.checkmailStatus === 'not_exist').length,
    error: results.filter(r => r.checkmailStatus === 'error').length,

    avgScore: Math.round(results.reduce((acc, curr) => acc + curr.qualityScore, 0) / (results.length || 1))
  };

  return { summary, results };
}


module.exports = {
  validateSingleEmail,
  validateBulkEmails,
  validateSyntax,
  checkDnsMx
};
