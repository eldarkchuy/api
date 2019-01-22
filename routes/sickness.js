'use strict'
const express = require('express');
const sicknessCtrl = require('../controllers/sickness');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/registerSickness',[md_auth.ensureAuth, md_admin.isAdmin],sicknessCtrl.saveSickness);
router.get('/getSicknesses',sicknessCtrl.getSicknesses);
router.get('/getSickness/:id',sicknessCtrl.getSickness);
router.put('/updateSickness/:id',[md_auth.ensureAuth, md_admin.isAdmin],sicknessCtrl.updateSickness);

module.exports = router;