'use strict'
const express = require('express');
const vaccinesCtrl = require('../controllers/vaccine');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/registerVaccine', [md_auth.ensureAuth, md_admin.isAdmin], vaccinesCtrl.save);//ok
router.put('/deleteVaccine/:id',[md_auth.ensureAuth, md_admin.isAdmin],vaccinesCtrl.deleteVaccine);//ok
router.put('/activeVaccine/:id',[md_auth.ensureAuth, md_admin.isAdmin],vaccinesCtrl.activeVaccine);//ok
router.put('/updateVaccine/:id',[md_auth.ensureAuth, md_admin.isAdmin],vaccinesCtrl.updateVaccine);//ok
router.get('/getVaccine/:id',[md_auth.ensureAuth],vaccinesCtrl.getVaccine);//ok
router.get('/getVaccines',[md_auth.ensureAuth],vaccinesCtrl.getVaccines);//ok

module.exports = router;