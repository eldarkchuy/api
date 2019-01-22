'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AddressSchema = Schema({
    idUser: {type: Schema.ObjectId, ref: 'User'},
    state: String,
    municipality: String,
    city: String,
    zp: Number,
    colony: String,
    street: String,
    inNumber: String,
    outNumber: String
});

module.exports = mongoose.model('Address',AddressSchema);