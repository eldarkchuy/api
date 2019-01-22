'use strict'

const moongose = require('mongoose');
const Schema = moongose.Schema;

var VaccineAnimalSchema = Schema({
    idPet: {type: Schema.ObjectId, ref: 'Pet'},
    idVaccine: {type: Schema.ObjectId, ref: 'Vaccine'},
    date: String
});

module.exports = moongose.model('VaccineAnimal', VaccineAnimalSchema);