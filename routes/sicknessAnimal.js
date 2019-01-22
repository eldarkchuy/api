'use strict'
const express = require('express');
const sicknessAnimalCtrl = require('../controllers/sicknessAnimal');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/addSicknessAnimal',[md_auth.ensureAuth,md_admin.isAdmin],sicknessAnimalCtrl.saveSicknessAnimal);
router.get('/getSicknessAnimals',sicknessAnimalCtrl.getSicknessPets);
router.get('/getSicknessAnimal/:id',sicknessAnimalCtrl.getPet);
router.put('/updateSicknessAnimal/:id',[md_auth.ensureAuth,md_admin.isAdmin],sicknessAnimalCtrl.updatePet);


module.exports = router;