const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // set it 1 min
    max: 5, //Max 5 attempt 
    message: 'Too many request from this IP. Please try again later'
})


const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(rateLimiter);

// Routes

app.get('/', (req, res) => {
    res.send('home shop server is running');
})

// client error handling
app.use((req, res, next) => {
    createError(404, 'route not found!'); // triggering the error
    next()
})

// server error handling
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        status: err.status,
        message: err.message
    })
})

app.listen(port, () => {
    console.log(`home shop running on port ${port}`);
})