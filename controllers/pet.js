'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const Pet = require('../models/pet');

function pruebas(req,res){
    res.status(200).send({
        message:'Testing pet controller and tests action',
        //pet: req.pet
    });
}

function savePet(req,res){
    var pet = new Pet();
    var params = req.body;

    if(params.name && params.sex && params.age && params.race ){

        //pet.idAnimal = params.idAnimal;
        pet.idAnimal = params.idAnimal;
        pet.name = params.name;
        pet.sex = params.sex;
        pet.age = params.age;
        pet.race = params.race;
        pet.color = params.color;
        pet.nature = params.nature;
        pet.rescue = params.rescue;
        pet.sterilized = params.sterilized;
        pet.image = null;
        pet.status = true;
        
            //guardar en bd
            pet.save((err, petStored)=>{
                if(err){
                    res.status(500).send({message:'Error al guardar la mascota'});
                }else{
                    if(!petStored){
                        res.status(404).send({message:'Mascota no registrada'});
                    }else{
                        res.status(200).send({pet: petStored});
                    }
                }
            });
        
    }else{
        res.status(200).send({
            message: 'Ingrese los datos correctamente'
        });
    }
    
}

function getPets(req,res){
    
    Pet.find({status:true}).populate('idAnimal').populate('race').exec((err,pets)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!pets){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({pets});
            }
        }
    });
}

function getPets2(req,res){
    
    Pet.find({status:false}).populate('idAnimal').populate('race').exec((err,pets)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!pets){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({pets});
            }
        }
    });
}

function getPet(req,res){
    var petID = req.params.id;
     Pet.findById(petID).populate('idAnimal').populate('race').exec((err,pet)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!pet){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({pet});
            }
        }
     });
}

function updatePet(req,res){
    var petID = req.params.id;
    var update = req.body;

    Pet.findByIdAndUpdate(petID,update,{new:true},(err,petUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!petUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({petUpdated});
            }
        }
    });
}

function uploadImage(req,res){
    
    var id = req.params.id;

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

    var nombreArchivo= `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;
    var path = `./upload/pets/${nombreArchivo}`;

    archivo.mv(path,err=>{
        if(err){
            return res.status(404).send({message:'error al mover archivo'});
        }

        Pet.findById(id,(err,pet)=>{
            var pathViejo = '.upload/pets/'+pet.image;
            
            if(fs.existsSync(pathViejo)){
                fs.unlink(pathViejo);
            }
            pet.image = nombreArchivo;

            pet.save((err,pet)=>{
                if(err){
                    return res.status(404).send({message:'error al guardar'});
                }else{
                    return res.status(200).send(pet);
                }
            });
        });

    });


    // var petId = req.params.id;
    // var file_name = 'No subido...';

    // if(req.files){
    //     var file_path = req.files.image.path;
    //     var file_split = file_path.split('\\');
    //     var file_name = file_split[2];

    //     var ext_split = file_name.split('\.');
    //     var file_ext = ext_split[1];

    //     if(file_ext == 'png' || file_ext =='jpg' || file_ext== 'jpeg' || file_ext == 'gif'){
            
    //         // if(petId != req.pet.sub){
    //         //     return res.status(500).send({message: 'No tienes permiso para actualizar la mascota'});
    //         // }
        
    //         Pet.findByIdAndUpdate(petId, {image:file_name}, {new:true}, (err,petUpdated)=>{
    //             if(err){
    //                 res.status(500).send({message: 'Error al actualizar la mascota'});
    //             }else{
    //                 if(!petUpdated){
    //                     res.status(404).send({message: 'No se ha podido actualizar la mascota'});
    //                 }else{
    //                     res.status(200).send({pet: petUpdated, image:file_name});
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
    var path_file = './upload/pets/'+imageFile;

    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message:'la imagen no exise'});
        }
    });
}

function deletePet(){
    var petID = req.params.id;
    Pet.findByIdAndRemove(petID, (err,petRemoved)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!petRemoved){
                res.status(404).send({message:'No se ha borrado la mascota'});
            }else{
                res.status(200).send({pet: petRemoved});
            }
        }
    });
}

module.exports = {
    pruebas,
    savePet,
    getPets,
    getPets2,
    getPet,
    updatePet,
    uploadImage,
    getImageFile,
    deletePet
}