const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const calcRoute = require('./routes/calc');

connectDB()

const app = express();
const PORT = process.env.PORT || 5000;


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    next();
});

app.use(cors());
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));



app.use('/api/auth', authRoute);
app.use('/api/calc', calcRoute);

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
