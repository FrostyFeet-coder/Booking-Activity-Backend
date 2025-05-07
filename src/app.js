require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Initialize app
const app = express();

// CORS configuration
app.use(cors());  // If Postman is not sending an 'origin' header, this will work

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Route middleware
// This line should correctly load your authRoutes
const corsOptions = {
    origin: '*',  // Allow all origins (for testing purposes)
    methods: ['GET', 'POST'],  // Allow GET and POST methods
  };
  
  app.use(cors(corsOptions));
  
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
  });

app.get('/test', (req, res) => {
    res.send('Test route is working');
  });
  
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
  });
  
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('App has started successfully!');
  });
  