'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '1estanoesunaclave2';
exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        lastName1: user.lastName1,
        lastName2: user.lastName2,
        tel: user.tel,
        email: user.email,
        //address: user.address,
        role: user.role,
        birthday: user.birthday,
        income: user.income,
        status: user.status,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload,secret);
};