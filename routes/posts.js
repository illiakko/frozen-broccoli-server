const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'Cool title',
            text: 'A lot of text',
            user: req.user
        }
    })
})

module.exports = router