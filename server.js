// Importing required modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
dotenv.config();
 connectDb();

// Configuring environment variables
dotenv.config();

// App initialization
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // Corrected from "expres.json()" to "express.json()"
app.use(cors());

// Routes
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transections', require('./routes/transectionRoutes'));
// Port
const PORT = process.env.PORT || 8080;

// Listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white); // Optional styling from 'colors'
});
