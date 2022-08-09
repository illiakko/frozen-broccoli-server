const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkAuth = require('../utils/checkAuth')
const { validationResult } = require('express-validator')

// Register user
const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const emailExist = await User.findOne({ email: req.body.email })

        if (emailExist) {
            return res.status(400).send({
                message: 'This email address is already being used.'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        const savedUser = await user.save();

        const token = jwt.sign(
            {
                id: savedUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.send({
            user: savedUser.name,
            email: savedUser.email,
            id: savedUser._id,
            token,
            message: 'Your registration is successful.',

        })
    } catch (error) {
        res.json({ message: 'Registration failed.' })
    }
}

// Login user
const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).send({
                message: 'Email or password is wrong.'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).send({
                message: 'Email or password is wrong.'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        const { password, ...userData } = user._doc

        res.json({
            token,
            userData,
            message: 'Authorization succeeded.',
        })

    } catch (error) {
        res.json({ message: 'Authorization failed.' })
    }

}

// Me
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'No Such User.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        const { password, ...userData } = user._doc

        res.json({
            userData,
            token,
        })
    } catch (error) {
        res.json({ message: 'No access.' })
    }
}


module.exports = {
    register,
    login,
    getMe
}