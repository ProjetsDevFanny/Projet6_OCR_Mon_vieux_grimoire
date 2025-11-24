# Backend - Mon Vieux Grimoire

![Capture d'écran de l'application](localhost_3000_.png)

## 📋 Présentation

Ce projet présente le **backend complet** d'une API REST pour une application de gestion de livres avec système de notation. Le développement a été entièrement réalisé sur la partie backend, mettant en œuvre une architecture moderne et sécurisée.

*Projet réalisé dans le cadre de la formation OpenClassrooms.*

## 🎯 Compétences Développées

- Développement d'API REST complète
- Architecture backend modulaire et maintenable
- Sécurisation d'une application (authentification, autorisation)
- Gestion de base de données NoSQL avec Mongoose
- Upload et gestion de fichiers
- Implémentation de logique métier complexe (système de notation)
- Bonnes pratiques de développement Node.js/Express

## 🛠️ Technologies et Techniques Mises en Œuvre

### Framework et Runtime
- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express.js 5.1.0** : Framework web minimaliste et flexible pour créer des APIs REST

### Base de Données
- **MongoDB** : Base de données NoSQL orientée documents
- **Mongoose 8.19.2** : ODM (Object Document Mapper) pour MongoDB permettant la modélisation des données avec des schémas

### Sécurité et Authentification
- **JWT (JSON Web Tokens)** : Système d'authentification par tokens pour sécuriser les routes
- **bcrypt 6.0.0** : Hachage sécurisé des mots de passe avec algorithme de chiffrement unidirectionnel
- **Middleware d'authentification personnalisé** : Vérification et validation des tokens JWT sur les routes protégées

### Gestion des Fichiers
- **Multer 2.0.2** : Middleware pour la gestion des uploads de fichiers (images)
- **Configuration personnalisée** : Gestion du stockage sur disque, validation des types MIME, génération de noms de fichiers uniques

### Configuration et Environnement
- **dotenv** : Gestion des variables d'environnement pour la configuration sécurisée (URI MongoDB, secrets JWT, ports)

### Architecture et Organisation du Code
- **Architecture MVC (Model-View-Controller)** : Séparation claire des responsabilités
  - **Models** : Schémas Mongoose pour les entités Book et User
  - **Controllers** : Logique métier pour les opérations CRUD
  - **Routes** : Définition des endpoints API
- **Middleware personnalisés** : Réutilisabilité et modularité du code
- **Gestion d'erreurs** : Try/catch, codes HTTP appropriés, messages d'erreur structurés

## 🏗️ Architecture de l'API

### Structure du Projet
```
backend/
├── server.js             # Démarrage du serveur HTTPC
├── app.js                # Configuration Express et middlewares
├── controllers/          # Logique métier
│   ├── book.js           # CRUD livres + notation
│   └── user.js           # Authentification (signup/login)
├── models/               # Schémas Mongoose
│   ├── book.js           # Modèle Book avec ratings
│   └── user.js           # Modèle User
├── routes/               # Définition des routes
│   ├── book.js           # Routes /api/books
│   └── user.js           # Routes /api/auth
├── middleware/           # Middlewares personnalisés
│   ├── auth.js           # Vérification JWT
│   └── multer-config.js  # Configuration upload images
└── images/               # Stockage des images uploadées
```

## 📝 Points Techniques Remarquables

- **Gestion asynchrone** : Utilisation de Promises avec .then() et .catch() pour les opérations asynchrones
- **Code modulaire** : Séparation claire des responsabilités (MVC)
- **Middleware chain** : Chaînage de middlewares (auth, multer) pour les routes protégées
- **Gestion des fichiers** : Utilisation du système de fichiers (fs) pour la suppression d'images
- **Normalisation du port** : Fonction de normalisation pour la configuration du serveur
- **Error handling** : Gestion centralisée des erreurs avec codes HTTP appropriés

## 🔌 Endpoints API

### Authentification (`/api/auth`)
- `POST /api/auth/signup` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion et récupération du token JWT

### Livres (`/api/books`)
- `GET /api/books` - Récupération de tous les livres
- `GET /api/books/bestrating` - Récupération des 3 meilleurs livres (triés par note moyenne)
- `GET /api/books/:id` - Récupération d'un livre spécifique
- `POST /api/books` - Création d'un livre (authentification requise + upload image)
- `PUT /api/books/:id` - Modification d'un livre (authentification + propriétaire uniquement)
- `DELETE /api/books/:id` - Suppression d'un livre (authentification + propriétaire uniquement)
- `POST /api/books/:id/rating` - Notation d'un livre (authentification requise)

## 💡 Principales fonctionnalités Implémentées

- **Système de notation** : Calcul automatique de moyenne des notes d'un livre, validation (0-5), tri des meilleurs livres
- **Gestion d'images** : Upload sécurisé (validation MIME), nommage unique, suppression automatique
- **Sécurité** : Authentification JWT, hachage bcrypt, autorisation par propriétaire, CORS configuré
- **Validation** : Schémas Mongoose, validation métier, gestion des doublons

## 🔒 Sécurité Mise en Place

1. **Authentification JWT** : Toutes les routes sensibles sont protégées
2. **Hachage bcrypt** : Mots de passe jamais stockés en clair
3. **Vérification de propriété** : Seul le créateur peut modifier/supprimer son livre
4. **Validation des entrées** : Contrôle des types, formats et plages de valeurs
5. **Gestion des erreurs sécurisée** : Messages d'erreur génériques pour éviter les fuites

## 📦 Dépendances Principales

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.2",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^6.0.0",
  "multer": "^2.0.2",
  "dotenv": "^17.2.3"
}
```

## 🚀 Installation et Démarrage

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement (créer un fichier `.env`) :
```
MONGO_URI=votre_uri_mongodb
PORT=5000
```

3. Démarrer le serveur :
```bash
npm start
# ou en mode développement avec nodemon
npm run dev
```

*Ce backend a été développé dans le cadre du projet "Mon Vieux Grimoire" (OpenClassrooms), démontrant une maîtrise complète des technologies backend modernes.*

