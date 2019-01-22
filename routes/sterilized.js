'use strict'
const express = require('express');
const sterilizedCtrl = require('../controllers/sterilized');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/registerSterilized',[md_auth.ensureAuth, md_admin.isAdmin],sterilizedCtrl.saveSterilized);
router.get('/getSterilizeds',sterilizedCtrl.getPets);
router.get('/getSterilized/:id',sterilizedCtrl.getPet);
router.put('/updatePet/:id',[md_auth.ensureAuth,md_admin.isAdmin],sterilizedCtrl.updatePet);



module.exports = router;