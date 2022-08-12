const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
