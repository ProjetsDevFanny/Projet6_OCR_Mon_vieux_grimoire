const http = require('http');
const app = require('./app');

// Fonction pour trouver un port valide pour lancer le serveur
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Définition du port d'écoute
const port = normalizePort(process.env.PORT ||'5000');
app.set('port', port);

// Fonction pour gérer les erreurs au démarrage du serveur (port nécessitant des droits admin (EACCES)) ou (le port est déjà utilisé (EADDRINUSE))

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur HTTP (et on y branche l'application express)
const server = http.createServer(app);

// Gestion des erreurs au démarrage du serveur
server.on('error', errorHandler);

// Gestion de l'écoute du serveur
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Démarrage du serveur
server.listen(port);

// Message de succès
console.log('Server is running on port ' + port);