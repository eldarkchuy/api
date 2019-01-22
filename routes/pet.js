'use strict'
const express = require('express');
const petCtrl = require('../controllers/pet');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './upload/pets'});
var fileUpload = require('express-fileupload');
router.use(fileUpload());

router.get('/get',petCtrl.pruebas);
router.get('/listPets',petCtrl.getPets);
router.get('/listPets2',petCtrl.getPets2);
router.get('/pet/:id',petCtrl.getPet);
// router.post('/registerAnimal', petCtrl.savePet);
// router.put('/updatePet/:id',petCtrl.updatePet);
// router.post('/upload-image/:id',petCtrl.uploadImage);
// router.delete('/deletePet/:id',petCtrl.deletePet);
router.get('/get-image-file/:imageFile',petCtrl.getImageFile);
router.post('/registerAnimal', [md_auth.ensureAuth, md_admin.isAdmin], petCtrl.savePet);
router.put('/updatePet/:id',[md_auth.ensureAuth, md_admin.isAdmin],petCtrl.updatePet);
router.put('/upload-image/:id',[md_auth.ensureAuth, md_admin.isAdmin],petCtrl.uploadImage);
router.delete('/deletePet/:id',[md_auth.ensureAuth, md_admin.isAdmin],petCtrl.deletePet);



module.exports = router;