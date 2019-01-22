'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SterilizedSchema = Schema({
    idPet: {type: Schema.ObjectId,ref: 'Pet'},
    date: String,
    status: Boolean
});

module.exports = mongoose.model('Sterilized', SterilizedSchema);