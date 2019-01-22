'use strict'
const express = require('express');
const appointmentCtrl = require('../controllers/appointment');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

router.post('/addAppointment',[md_auth.ensureAuth],appointmentCtrl.saveDate);
router.get('/getAppointment',[md_auth.ensureAuth],appointmentCtrl.getDates);
router.get('/getAppointment1/:id',[md_auth.ensureAuth],appointmentCtrl.getDate);
router.get('/getAppointmentByUser/:id',[md_auth.ensureAuth],appointmentCtrl.getDatesByUser);
router.put('/updateAppointment/:id',[md_auth.ensureAuth],appointmentCtrl.updateDate);
// router.get('/adoption/:id',appointmentCtrl.getAdoption);

module.exports = router;