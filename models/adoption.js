'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AdoptionSchema = Schema({
    idUser: {type: Schema.ObjectId, ref: 'User'},
    idPet: {type: Schema.ObjectId, ref: 'Pet'},
    date: String,
    status: Boolean
});

module.exports = mongoose.model('Adoption',AdoptionSchema);