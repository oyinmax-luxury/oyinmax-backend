require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const whatsappOrderRoutes = require('./routes/whatsappOrderRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');



const app = express();


//middleware
app.use(express.json());


// Configure CORS
// app.use(cors({
//   // Removed trailing slashes from the production URLs
//   origin: [
//     'http://localhost:5173', 
//     'https://oyinmax-frontend.vercel.app', 
//     'https://www.oyinmaxluxury.com'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow standard methods
//   allowedHeaders: ['Content-Type', 'Authorization'] // Ensure headers are allowed
// }));

const allowedOrigins = [
  'https://www.oyinmaxluxury.com',
  "https://oyinmaxluxury.com", 
  "http://localhost:5173",
  "https://oyinmax-frontend.vercel.app",
  "https://www.oyinmax-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true
}));


app.use(helmet());
app.use(morgan('dev'));



//health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({message: "Oyinmax luxury backend api is running..."});
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/whatsapp-orders', whatsappOrderRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api/admin', adminOrderRoutes);

app.use(notFound);
app.use(errorHandler);



module.exports = {app};