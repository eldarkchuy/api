'use strict'
const express = require('express');
const userCtrl = require('../controllers/user');

var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './upload/users'});
var fileUpload = require('express-fileupload');
router.use(fileUpload());

router.get('/getUsers',[md_auth.ensureAuth,md_admin.isAdmin],userCtrl.getUsers);
router.get('/getUser/:id',[md_auth.ensureAuth,md_admin.isAdmin],userCtrl.getUser);
router.post('/register',userCtrl.saveUser);
router.put('/update/:id',md_auth.ensureAuth,userCtrl.updateUser);
router.post('/login',userCtrl.login);
router.put('/upload-image/:id',[md_auth.ensureAuth],userCtrl.uploadImage);
router.get('/get-image-file/:imageFile',userCtrl.getImageFile);
// router.post('/add',userCtrl.addUser);
// router.put('/update/:id',userCtrl.updateUser);
// router.delete('/delete/:id',userCtrl.deleteUser);



module.exports = router;