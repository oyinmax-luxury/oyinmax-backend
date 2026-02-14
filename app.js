require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');



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

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);



module.exports = {app};