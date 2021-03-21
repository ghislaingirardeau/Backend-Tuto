const express = require('express') /* IMPORTE LES PACKAGES */
const mongoose = require('mongoose'); /* IMPORTE LES PACKAGES */

const stuffRoutes = require('./routes/stuff'); /* IMPORTE LE ROUTEUR */
const userRoutes = require('./routes/user');


const app = express()

mongoose.connect('mongodb+srv://ghislain:qwertyuio@cluster0.d1pzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes); /* LE DEBUT DE ROUTE, LE FICHIER IMPORTER */
app.use('/api/auth', userRoutes)


module.exports = app