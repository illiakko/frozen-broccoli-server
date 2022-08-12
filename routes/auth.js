const router = require('express').Router();

const registerValidation = require('../validations/auth');
const loginValidation = require('../validations/login');
const { login, register, getMe } = require('../controllers/auth');
const checkAuth = require('../utils/checkAuth.js');


// Registration
router.post('/register', registerValidation, register);

// Login
router.post('/login', loginValidation, login);

// Get Me
router.get('/me', checkAuth, getMe);

module.exports = router; 