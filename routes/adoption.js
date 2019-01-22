'use strict'
const express = require('express');
const adoptionCtrl = require('../controllers/adoption');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/addAdoption',[md_auth.ensureAuth],adoptionCtrl.saveAdoption);
router.get('/adoptions',[md_auth.ensureAuth,md_admin.isAdmin],adoptionCtrl.getAdoptions);
router.get('/adoption/:id',adoptionCtrl.getAdoption);
router.get('/adoptionUser/:id',adoptionCtrl.getAdoptionByUser);
router.put('/updateAdoption/:id',[md_auth.ensureAuth, md_admin.isAdmin],adoptionCtrl.updateAdoption);

module.exports = router;