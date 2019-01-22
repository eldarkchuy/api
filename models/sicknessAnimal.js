'use strict'
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 var SicknessAnimalSchema = Schema({
    idPet: {type: Schema.ObjectId, ref: 'Pet' },
    idSickness: {type: Schema.ObjectId, ref: 'Sickness'},
    status: Boolean
 });

 module.exports = mongoose.model('SicknessAnimal', SicknessAnimalSchema);