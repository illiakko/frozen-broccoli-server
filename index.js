const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const calcRoute = require('./routes/calc');

connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));



app.use('/api/auth', authRoute);
app.use('/api/calc', calcRoute);

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
