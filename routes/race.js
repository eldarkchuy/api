'use strict'
const express = require('express');
const raceCtrl = require('../controllers/race');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.get('/get',raceCtrl.pruebas);
router.post('/add',[md_auth.ensureAuth,md_admin.isAdmin],raceCtrl.saveRace);
router.get('/getRace/:id',raceCtrl.getRace);
router.get('/getRaces',raceCtrl.getRaces);
router.get('/getRacesByTypeAnimal/:id',raceCtrl.getRacesByTypeAnimal);
router.put('/updateRace/:id',[md_auth.ensureAuth,md_admin.isAdmin],raceCtrl.updateRace);

module.exports = router;