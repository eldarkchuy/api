'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AppointmentSchema = Schema({
    idAdoption: {type: Schema.ObjectId, ref: 'Adoption'},
    date: String,
    hour: String,
    message: String,
    // address: String,
    statusU: Boolean,
    statusA: Boolean,
    status: Boolean
});

module.exports = mongoose.model('Appointment', AppointmentSchema);