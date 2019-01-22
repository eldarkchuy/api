'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path'); 
//modelos
const User = require('../models/user');
//servicio jwt
const jwt = require('../services/jwt');
//acciones
function pruebas(req,res){
    res.status(200).send({
        message:'Testing user controller and tests action',
        user: req.user
    });
}

function saveUser(req,res){
    var user = new User();
    var params = req.body;

    if(params.password  && params.name && params.lastName1 && params.lastName2 && params.tel
        && params.email  && params.birthday && params.income){

        user.name = params.name;
        user.lastName1 = params.lastName1;
        user.lastName2 = params.lastName2;
        user.tel = params.tel;
        user.email = params.email;
        user.role = params.role;
        user.address = params.address;
        user.birthday = params.birthday;
        user.income = params.income;
        user.status = true;
        
        
        //verificar que no exista el usuario
        User.findOne({email: user.email.toLowerCase()},(err,issetUser)=>{
            if(err){
                res.status(500).send({message:"Error al comprobar el usuario"});
            }else{
                if(!issetUser){
                    //cifrar contra
                    bcrypt.hash(params.password, null, null, function(err,hash){
                        user.password = hash;
                        //guardar en bd
                        user.save((err, userStored)=>{
                            if(err){
                                res.status(500).send({message:'Error al guardar el usuario'});
                            }else{
                                if(!userStored){
                                    res.status(404).send({message:'Usuario no registrado'});
                                }else{
                                    res.status(200).send({user: userStored});
                                }
                            }
                        });
                    });
                }else{
                    res.status(200).send({message: "El usuario ingresado ya existe"});
                }
            }
        })
        
    }else{
        res.status(200).send({
            message: 'Ingrese los datos correctamente'
        });
    }
    // res.status(200).send({
    //     message:'Register method'
    // })
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;
    delete update.password;
    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar el usuario'});
    }

    User.findByIdAndUpdate(userId, update, {new:true}, (err,userUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido acutalizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
    
    //res.status(200).send({message: 'Metodo para actualizar usuario'});
}

function getUsers(req,res){//solo usuarios NO admin
    User.find({role:'user'}).exec((err,users)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!users){
                res.status(404).send({message:'no hay direcciones'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}

function getUser(req,res){
    var userID = req.params.id;
     User.findById(userID).exec((err,user)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message:'el usuario no existe'});
            }else{
                res.status(200).send({user});
            }
        }
     });
}

function login(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err,user)=>{
        if(err){
            res.status(500).send({message:'Error al comprobar el usuario'});
        }else{
            if(user){
                bcrypt.compare(password, user.password, (err,check)=>{
                    if(check){
                        //comprobar y generar token
                        if(params.gettoken){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({
                            message: 'La contraseña ingresada no es correcta'
                        });
                    }
                });
                //res.status(200).send({user});
            }else{
                res.status(404).send({message:'Usuario no registrado'});
            }
        }
    });
    
}

function uploadImage(req,res){
    var userId = req.params.id;

    // var id = req.params.id;

    if(!req.files){
        return res.status(404).send({message:'no hay archivo'});
    }

    var archivo = req.files.image;
    var nombreExt = archivo.name.split('.');
    var extensionArchivo = nombreExt[nombreExt.length-1];

    var extensionesValidas = ['png','jpg','jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo)<0){
        return res.status(404).send({message:'extension no valida'});
    }   

    var nombreArchivo= `${userId}-${new Date().getMilliseconds()}.${extensionArchivo}`;
    var path = `./upload/users/${nombreArchivo}`;

    archivo.mv(path,err=>{
        if(err){
            return res.status(404).send({message:'error al mover archivo'});
        }

        User.findById(userId,(err,user)=>{
            var pathViejo = '.upload/users/'+user.image;
            
            if(fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }
            user.image = nombreArchivo;

            user.save((err,user)=>{
                if(err){
                    return res.status(404).send({message:'error al guardar'});
                }else{
                    return res.status(200).send(user);
                }
            });
        });

    });

    // var file_name = 'No subido...';

    // if(req.files){
    //     var file_path = req.files.image.path;
    //     var file_split = file_path.split('\\');
    //     var file_name = file_split[2];

    //     var ext_split = file_name.split('\.');
    //     var file_ext = ext_split[1];

    //     if(file_ext == 'png' || file_ext =='jpg' || file_ext== 'jpeg' || file_ext == 'gif'){
            
    //         if(userId != req.user.sub){
    //             return res.status(500).send({message: 'No tienes permiso para actualizar el usuario'});
    //         }
        
    //         User.findByIdAndUpdate(userId, {image:file_name}, {new:true}, (err,userUpdated)=>{
    //             if(err){
    //                 res.status(500).send({message: 'Error al actualizar el usuario'});
    //             }else{
    //                 if(!userUpdated){
    //                     res.status(404).send({message: 'No se ha podido actualizar el usuario'});
    //                 }else{
    //                     res.status(200).send({user: userUpdated, image:file_name});
    //                 }
    //             }
    //         });

    //     }else{
    //         fs.unlink(file_path, (err)=>{
    //             if(err){
    //                 res.status(200).send({message:'fichero no guardado y no borrado'});
    //             }else{
    //                 res.status(200).send({message:'extension no valida'});
    //             }
    //         });
    //     }
        
    // }else{
    //     res.status(200).send({message: 'No se han subido archivos'});
    // }
    
}
function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './upload/users/'+imageFile;

    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message:'la imagen no exise'});
        }
    });
}


module.exports={
    pruebas,
    saveUser,
    updateUser,
    login,
    uploadImage,
    getImageFile,
    getUsers,
    getUser
}

// const moment = require('moment');

// var users = [
//     {id:1, name:'noe', lastname:'orrantia'},
//     {id:2, name:'pablo', lastname:'nafarrate'},
//     {id:3, name:'ana', lastname:'hernandez'}
// ];

// function getUsers(req,res){
//     res.status(200).send({users:users});
// };

// function addUser(req,res){
//     var data = req.body;
//     if(!data.name)return res.status(500).send({message:"Error, no se enviaron todos los datos"});
//     var lastname = data.lastname || null;
//         var id = users.length+1;
//         users.push({
//             id: id,
//             name: data.name,
//             lastname: lastname
//         });
//         console.log(users);
//         res.status(200).send({users:users});    
// }


// function updateUser(req,res){
//     var id = req.params.id;
//     var data = req.body;
//     var userFind = users.find(user => user.id==id);
//     console.log(userFind);
    
//     if(!userFind) return res.status(404).send({message:`No existe ese id ${id}`});
//     userFind.name = data.name || userFind.name;
//     userFind.lastname = data.lastname || userFind.lastname;
//     res.status(200).send({users});
// }

// function deleteUser(req,res){
//     var id = req.params.id;
//     users = users.filter(user=>{
//         if(user.id != id){
//             return true
//         }else return false
//     });
//     res.status(200).send({users});
// }
// module.exports = {
//     getUsers,
//     addUser,
//     updateUser,
//     deleteUser
// };