const mongoose = require('mongoose');

// 1. Définition du schéma (structure des données)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// 2. Création du modèle (constructeur + méthodes) (collection de la base de données)
module.exports = mongoose.model('User', userSchema);