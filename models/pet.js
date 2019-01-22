'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PetSchema = Schema({
    idAnimal: {type: Schema.ObjectId, ref: 'TypeAnimal'},
    name: String,
    sex: Boolean,
    age: String,
    race: {type: Schema.ObjectId, ref: 'Race'},
    color: String,
    nature: String,
    sterilized:Boolean,
    rescue: Boolean,
    image: String,
    status: Boolean

});

module.exports= mongoose.model('Pet',PetSchema);
