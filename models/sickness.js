'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SicknessSchema = Schema({
    description: String
});

module.exports = mongoose.model('Sickness', SicknessSchema);