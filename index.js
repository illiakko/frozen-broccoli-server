const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const calcRoute = require('./routes/calc');

connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

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
