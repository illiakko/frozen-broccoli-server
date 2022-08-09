const { body } = require('express-validator')

const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be at least 5 symbols').isLength({ min: 5 }),
    body('name', 'Name should be at least 5 symbols').isLength({ min: 5 })
]

module.exports = registerValidation;