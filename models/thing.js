const mongoose = require('mongoose'); /* APPEL LE PACKAGE MONGOOSE */

/* CREER LE SCHEMA DE DONNEES */

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Thing', thingSchema); /* VALIDE LE MODEL ET EXPORTE */