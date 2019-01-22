'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RaceSchema = Schema({

    idAnimal: {type: Schema.ObjectId, ref: 'TypeAnimal'},
    description: String,
    status: Boolean

});

module.exports= mongoose.model('Race',RaceSchema);
