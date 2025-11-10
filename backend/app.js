// app.js: Fichier principal de l'application Node.js

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
  .catch(err => console.log('❌ Connexion à MongoDB échouée !', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use('/api/book', bookRoutes); 
app.use('/api/auth', userRoutes);

// Route statique pour les images (middleware "static")
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;