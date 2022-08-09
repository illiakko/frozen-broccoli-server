const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

connectDB()

const app = express();

app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, () => console.log('Server up!'))
