const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')
/* npm install --save mongoose-unique-validator 
Package permettant de rendre l'adresse email unique =
pas possible de saisr 2 fois la meme*/


const userSchema = mongoose.Schema ({
    email: { type: String, required: true, unique: true}, /* Unique renvoie egalement a une seule adresse mais moins stable que package */
    password: { type: String, required: true},
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)