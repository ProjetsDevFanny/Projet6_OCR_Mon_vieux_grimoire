const rateLimit = require('express-rate-limit');

// Limiteur général (100 requêtes par 15 minutes)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes, réessayez plus tard.'
});

// Limiteur pour l'authentification (5 tentatives par 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Trop de tentatives de connexion.'
});

// Limiteur pour les uploads (10 par heure)
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Trop d\'uploads.'
});

module.exports = {
  generalLimiter,
  authLimiter,
  uploadLimiter
};