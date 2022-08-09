const router = require('express').Router();
const registerValidation = require('../validations/auth')
const loginValidation = require('../validations/login')
const { login, register, getMe } = require('../controllers/auth')


// Registration
router.post('/register', registerValidation, register)

// Login
router.get('/login', loginValidation, login)

// Get Me
router.get('/me', getMe)

module.exports = router; 