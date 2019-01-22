'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SocialNetworkSchema = Schema({
    name: String,
    uri: String,
    status: Boolean
});

module.exports = mongoose.model('SocialNetwork',SocialNetworkSchema);