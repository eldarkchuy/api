'use strict'
const express = require('express');
const vaccinesAnimalCtrl = require('../controllers/vaccineAnimal');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/registerVaccine', [md_auth.ensureAuth, md_admin.isAdmin], vaccinesAnimalCtrl.saveVaccine);
router.get('/getVaccine/:id',[md_auth.ensureAuth],vaccinesAnimalCtrl.getVaccine);
router.get('/getVaccines',[md_auth.ensureAuth],vaccinesAnimalCtrl.getVaccines);
router.delete('/deleteVaccine/:id',[md_auth.ensureAuth, md_admin.isAdmin],vaccinesAnimalCtrl.deleteVaccine);

module.exports = router;