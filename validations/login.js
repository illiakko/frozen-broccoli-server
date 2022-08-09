const { body } = require('express-validator')

const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be at least 5 symbols').isLength({ min: 5 }),
]

module.exports = loginValidation;