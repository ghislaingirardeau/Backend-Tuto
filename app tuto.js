const express = require('express') /* IMPORTE LES PACKAGES */
const mongoose = require('mongoose'); /* IMPORTE LES PACKAGES */

const Thing = require('./models/thing') /* IMPORTE LES PACKAGES */

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

/* ENVOIE DANS LA BASE DE DONNEES */

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id; /* parce que l'id est genere en auto sur le frontend */
  const thing = new Thing({ 
    ...req.body  /* Copie les elements envoyé dans le nouveau schema */
  });
  thing.save() /* fonction save qui renvoie une promesse et enregistre l'objet dans la base de donnee */
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

/* SUPPRIMER UN OBJET  */

app.delete('/api/stuff/:id', function (req, res, next)  { /* PUT pour la modif */
  Thing.deleteOne({_id: req.params.id}) /* un seul argument car suppression */
    .then(() => res.status(200).json({message: 'suppr ok'}))
    .catch(error => res.status(400).json({error}))
})

/* MODIFIER UN OBJET */

app.put('/api/stuff/:id', function (req, res, next)  { /* PUT pour la modif */
  Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id}) /* updateOne fonction de modif de ce schema avec 2 parametres:
   id correspondant et la copie(...) req de la modif req.body, rajoute l'id pour etre sur qu'il prend bien le bon en modif*/
    .then(() => res.status(200).json({message: 'modif ok'}))
    .catch(error => res.status(400).json({error}))
})

/* RECUPERER LES ELEMENTS ENVOYER DANS LA BASE DE DONNEES */

app.get('/api/stuff/:id', (req, res, next) => { /* :id ajoute de maniere dynamique l'id a la route */
  Thing.findOne({ _id: req.params.id }) /* element a rechercher dans req.params.id */
    .then(thing => res.status(200).json(thing)) /* objet json renvoye si ok */
    .catch(error => res.status(404).json({error}))
    console.log({_id: req.params.id})
})

app.get('/api/stuff', (req, res, next) => {
  Thing.find() /* peut prendre en parametre une recherche specifique, si vide alors recherche tout */
    .then(things => res.status(200).json(things)) /* recherche tous les things (schema) et les renvoie */
    .catch(error => res.status(400).json({error}))
});

/* RECUPERER DES ELEMENTS EN STATIQUE */

/* app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 7900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
    next()
  }); */  

module.exports = app