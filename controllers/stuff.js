/* LISTE DES CONTROLLERS QUE NOUS ENVERRONT A CHAQUE ROUTES POUR CLARFIFIER LES DOSSIERS */

/* Exports = permets directment d'exporter le nom de la fonction */

const Thing = require('../models/thing') /* IMPORTE les fonctions de l'application */

exports.createThing = (req, res, next) => {
    delete req.body._id;
  const thing = new Thing({ 
    ...req.body  
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