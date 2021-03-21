/* LISTE DES CONTROLLERS QUE NOUS ENVERRONT A CHAQUE ROUTES POUR CLARFIFIER LES DOSSIERS */

/* Exports = permets directment d'exporter le nom de la fonction */

const Thing = require('../models/thing') /* IMPORTE les fonctions de l'application */

/* A l'jout de MULTER, il faut aussi changer les controller pour integrer ce middleware */

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing) /* A l'envoie de l'image charge le tout dans une chaine de caractere */
  /* Fonction pour recuperer l'objet dans cette chaine de caractere */ 
  delete thingObject._id;
    const thing = new Thing({ 
      ...thingObject, 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      /* {req.protocol} = http ou https */
      /* {req.get('host')} la racine du server, post du server ex localhost3000*/
      /* {req.file.filename} nom de l'image enregistrer dans la requete par multer*/
      /* pour recuperer l'URL faite par multer, donc il faut la recuperer*/
    });
  thing.save() 
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.changeThing = (req, res, next) => { 
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id}) 
      .then(() => res.status(200).json({message: 'modif ok'}))
      .catch(error => res.status(400).json({error}))
}

exports.deleteThing = function (req, res, next)  { 
    Thing.deleteOne({_id: req.params.id}) 
      .then(() => res.status(200).json({message: 'suppr ok'}))
      .catch(error => res.status(400).json({error}))
}

exports.getThing = (req, res, next) => {
    Thing.find() 
      .then(things => res.status(200).json(things)) 
      .catch(error => res.status(400).json({error}))
}

exports.getOneThing = (req, res, next) => { 
    Thing.findOne({ _id: req.params.id }) 
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({error}))
  }