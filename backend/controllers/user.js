const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction de signup = inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
        // Crée un nouveau compte utilisateur
      const user = new User({
        email: req.body.email,
        password: hash
      });
      // Enregistre le compte utilisateur dans la base de données
      user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => {
        if (error.code === 11000) {
          console.warn('Tentative de création avec un email déjà existant:', req.body.email);
          res.status(400).json({ message: 'Paire login/mot de passe incorrecte' });
        } else {
          res.status(500).json({ error });
        }
      });
  })
  .catch(error => res.status(500).json({ error }));
};

// Fonction de login = connexion
exports.login = (req, res, next) => {
  // Recherche l'utilisateur par email
  User.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
          }
          // Compare le mot de passe fourni avec le mot de passe stocké
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                  }
                  // Crée un token JWT pour l'utilisateur
                  const token = jwt.sign(
                    { userId: user._id},
                    process.env.TOKEN_SECRET,
                    { expiresIn: '24h' }
                  );
                  res.status(200).json({ userId: user._id, token });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};