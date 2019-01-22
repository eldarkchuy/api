'use strict'
const express = require('express');
const documentCtrl = require('../controllers/document');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

// var multipart = require('connect-multiparty');
var fileUpload = require('express-fileupload');
router.use(fileUpload());
// var md_upload = multipart({uploadDir: './upload/documents'});

router.get('/get',documentCtrl.pruebas);
router.get('/getDocument/:idUser/:idAnimal',documentCtrl.getDocument);//seleccionar tramite entre usuario y la mascota
router.get('/getDocumento/:id',documentCtrl.getDocument1);//quizas el de arriba obsoleto---seleccionar tramite especifico 
router.get('/getDocumentByAnimal/:idAnimal',documentCtrl.getDocumentByAnimal);//mostrar usuarios que han enviado documentacion
router.get('/getDocumentByUser/:idUser',documentCtrl.getDocumentByUser);//mostrar usuarios que han enviado documentacion
router.post('/add', md_auth.ensureAuth, documentCtrl.saveDocument);//crear tramite
router.put('/gets/:id/:name/:lastname/:pet',documentCtrl.uploadRequestPDF);//generar el pdf
router.put('/updateRequest/:id',documentCtrl.uploadRequest);//añadir solicitud de adopcion archivo
router.put('/updateLetter/:id',documentCtrl.uploadLetter);//añadir carta comp
router.put('/updateIdentify/:id',documentCtrl.uploadIdentify);//añadir comprobante de identificacion
router.put('/updateAgreement/:id',documentCtrl.uploadAgreement);//añadir contrato de adopcion

router.get('/request/:file',documentCtrl.getFile);//ver documentos

router.put('/updateDocument/:id',documentCtrl.updateDocument);


// router.get('/listPets',petCtrl.getPets);
// router.get('/pet/:id',petCtrl.getPet);
// router.post('/registerAnimal', [md_auth.ensureAuth, md_admin.isAdmin], petCtrl.savePet);
// router.post('/upload-image/:id',[md_auth.ensureAuth, md_admin.isAdmin, md_upload],petCtrl.uploadImage);
// router.delete('/deletePet/:id',[md_auth.ensureAuth, md_admin.isAdmin],petCtrl.deletePet);



module.exports = router;