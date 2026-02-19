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



// Configure CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://oyinmax-frontend.vercel.app",
  "https://www.oyinmaxluxury.com",
  "https://oyinmaxluxury.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
};

app.use(cors(corsOptions));


//middleware
app.use(express.json());
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