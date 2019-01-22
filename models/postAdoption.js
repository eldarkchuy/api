'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostAdoptionSchema = Schema({
    idAdoption: {type: ObjectId, ref: 'Adoption'},
    description: String,
    date: String
});

module.exports = mongoose.model('PostAdoption', PostAdoptionSchema);