/**
 * List of known disposable & temporary email service domains.
 */
const DISPOSABLE_DOMAINS = new Set([
  // Popular Disposable Email Providers
  'mailinator.com', 'tempmail.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
  'guerrillamail.biz', 'guerrillamail.blockable.io', '10minutemail.com', '10minutemail.net', '10minutemail.org',
  'trashmail.com', 'trashmail.net', 'trashmail.me', 'sharklasers.com', 'dispostable.com',
  'getairmail.com', 'mohmal.com', 'mytrashmail.com', 'fakeinbox.com', 'yopmail.com', 'yopmail.fr',
  'yopmail.net', 'cool.fr.nf', 'jetable.fr.nf', 'nospam.ze.tc', 'nomail.xl.cx', 'mega.zik.dj',
  'speed.1s.fr', 'courriel.jp.net', 'moncourriel.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf',
  '0815.ru', '0815.su', '0815.ry', '0clickemail.com', '10minutemail.co.za', '20minutemail.com',
  '30minutemail.com', 'emlpro.com', 'emlhub.com', 'burnermail.io', 'mailcatch.com',
  'maildrop.cc', 'getnada.com', 'inboxalias.com', 'tmail.ws', 'tmpmail.org', 'tmpmail.net',
  'tempmail.net', 'tempmail.dev', 'tempmailo.com', 'temp-mail.org', 'temp-mail.io',
  'disposablemail.com', 'throwawaymail.com', 'mail-drop.com', 'crazymailing.com', 'bupmail.com',
  'teleworm.us', 'dayrep.com', 'armyspy.com', 'rhyta.com', 'jourrapide.com', 'einrot.com',
  'fleckens.hu', 'gustr.com', 'superrito.com', 'cuvox.de', 'zohomail.com', 'spamgourmet.com',
  'binkmail.com', 'bobmail.info', 'chammy.info', 'devnullmail.com', 'letthemeatspam.com',
  'mailinater.com', 'reallymymail.com', 'reconmail.com', 'safetymail.info', 'smailpro.com',
  'tempinbox.com', 'disposable.com', 'temp-mail.ru', 'disposableaddress.com', 'spambox.us',
  'trashymail.com', 'mailnesia.com', 'mailnull.com', 'spam4.me', 'my10minutemail.com',
  'minutemail.com', 'emailondeck.com', 'disposable-email.ml', 'instantemail.org', 'dropmail.me',
  'nada.ltd', 'abyssmail.com', 'anonymbox.com', 'getontrac.com', 'mohmal.in', 'mohmal.tech',
  'internalmail.site', 'internmail.net', 'guerrillamail.de', 'pokemail.net', 'spamfree24.org',
  'fakemailgenerator.com', 'emailfake.com', 'generator.email', 'tempmail.alt', 'maildu.de',
  'meltmail.com', 'disposablemail.net', 'temp-mail.alt', 'nospammail.net', 'throwaway.email'
]);

/**
 * Known Public / Free Consumer Email Providers
 */
const PUBLIC_PROVIDERS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.co.id', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'ymail.com', 'rocketmail.com',
  'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'office365.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'aim.com',
  'protonmail.com', 'proton.me', 'pm.me',
  'zoho.com', 'gmx.com', 'gmx.net', 'web.de',
  'yandex.com', 'yandex.ru',
  'mail.com', 'email.com',
  'fastmail.com', 'tutanota.com', 'tutamail.com', 'tuta.io'
]);

/**
 * Check if a domain is a known disposable email domain
 * @param {string} domain 
 * @returns {boolean}
 */
function isDisposableDomain(domain) {
  if (!domain) return false;
  const cleanDomain = domain.toLowerCase().trim();
  return DISPOSABLE_DOMAINS.has(cleanDomain);
}

/**
 * Classify domain type
 * @param {string} domain 
 * @returns {'public' | 'disposable' | 'custom'}
 */
function classifyDomain(domain) {
  if (!domain) return 'custom';
  const cleanDomain = domain.toLowerCase().trim();
  if (DISPOSABLE_DOMAINS.has(cleanDomain)) return 'disposable';
  if (PUBLIC_PROVIDERS.has(cleanDomain)) return 'public';
  return 'custom';
}

module.exports = {
  isDisposableDomain,
  classifyDomain,
  DISPOSABLE_DOMAINS,
  PUBLIC_PROVIDERS
};
