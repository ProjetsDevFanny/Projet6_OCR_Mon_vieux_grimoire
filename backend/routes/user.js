const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const { authLimiter } = require('../middleware/rateLimit');

router.post('/signup', authLimiter, userCtrl.signup);
router.post('/login', authLimiter, userCtrl.login);

module.exports = router;