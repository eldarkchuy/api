'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = Schema({

    name: String,
    lastName1: String,
    lastName2: String,
    tel: Number,
    email: String,
    role: String,
    birthday: String, //tipo de dato date
    income: Number, //income=ingresos
    password: String,
    status: Boolean,
    image: String

});

module.exports= mongoose.model('User',UserSchema);