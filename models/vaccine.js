'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VaccineSchema = Schema({
    description: String,
    status: Boolean
});

module.exports = mongoose.model('Vaccine', VaccineSchema);