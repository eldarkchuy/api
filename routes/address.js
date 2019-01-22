'use strict'
const express = require('express');
const addressCtrl = require('../controllers/address');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/addAddress',addressCtrl.saveAddress);
router.put('/updateAddress/:idUser',[md_auth.ensureAuth],addressCtrl.updateAddress);
router.get('/listAddress',[md_auth.ensureAuth,md_admin.isAdmin],addressCtrl.getAddresses);
router.get('/address/:idUser',[md_auth.ensureAuth],addressCtrl.getAddressByUser);

module.exports = router;