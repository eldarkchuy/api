'use strict'
const express = require('express');
const typeAnimalCtrl = require('../controllers/typeAnimal');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/registerTypeAnimal', [md_auth.ensureAuth, md_admin.isAdmin], typeAnimalCtrl.saveType);//ok
router.put('/deleteTypeAnimal/:id',[md_auth.ensureAuth, md_admin.isAdmin],typeAnimalCtrl.deleteAnimal);//ok
router.put('/activeTypeAnimal/:id',[md_auth.ensureAuth, md_admin.isAdmin],typeAnimalCtrl.activeAnimal);//ok
router.get('/getType/:id',[md_auth.ensureAuth],typeAnimalCtrl.getType);//ok
router.get('/getTypes',typeAnimalCtrl.getTypes);//ok

module.exports = router;