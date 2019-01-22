'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DocumentSchema = Schema({
    idAnimal: {type: Schema.ObjectId, ref: 'Pet'},
    idUser: {type: Schema.ObjectId, ref: 'User'},
    
    request: String,
    letter: String,
    identification: String,
    agreement: String,

    requestStatus: Boolean,
    letterStatus: Boolean,
    identificationStatus: Boolean,
    agreementStatus: Boolean,
    
    readyDocuments: Boolean,
    status: Boolean

});

module.exports= mongoose.model('Document', DocumentSchema);
