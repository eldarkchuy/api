'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TypeAnimalSchema = Schema({
    description: String,
    status: Boolean
});

module.exports = mongoose.model('TypeAnimal',TypeAnimalSchema);