const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();


//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({message: "Oyinmax luxury backend api is running..."});
});

module.exports = {app};