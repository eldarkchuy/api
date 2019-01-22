'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const Appointment = require('../models/appointment');

function pruebas(req,res){
    res.status(200).send({
        message:'Testing pet controller and tests action',
        //pet: req.pet
    });
}

function saveDate(req,res){
    var appointment = new Appointment();
    var params = req.body;

    if( params){

        appointment.idAdoption = params.idAdoption;
        appointment.date = params.date;
        appointment.hour = params.hour;
        appointment.message = params.message;
        appointment.statusA = true;
        appointment.statusU = null;
        appointment.status = null;
       
            //guardar en bd
            appointment.save((err, appointmentStored)=>{
                if(err){
                    res.status(500).send({message:'Error al guardar la mascota'});
                }else{
                    if(!appointmentStored){
                        res.status(404).send({message:'Cita no registrada'});
                    }else{
                        res.status(200).send({appointment});
                    }
                }
            });
        
    }else{
        res.status(200).send({
            message: 'Ingrese los datos correctamente'
        });
    }
    
}

function getDates(req,res){
    Appointment.find({}).populate('idAdoption').exec((err,dates)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!dates){
                res.status(404).send({message:'no hay citas'});
            }else{
                res.status(200).send({dates});
            }
        }
    });
}

function getDatesByUser(req,res){
    var idAdoption = req.params.id
    Appointment.find({idAdoption}).populate('idAdoption').exec((err,dates)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!dates){
                res.status(404).send({message:'no hay citas'});
            }else{
                res.status(200).send({dates});
            }
        }
    });
}

function updateDate(req,res){
    var dateID = req.params.id;
    var update = req.body;

    Appointment.findByIdAndUpdate(dateID,update,{new:true},(err,appointmentUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!appointmentUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({appointmentUpdated});
            }
        }
    });
}

function getDate(req,res){
    var appointmentID = req.params.id;
     Appointment.findById(appointmentID).populate('idAdoption').exec((err,appointment)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!appointment){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({appointment});
            }
        }
     });
}


function uploadImage(req,res){
    var petId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext =='jpg' || file_ext== 'jpeg' || file_ext == 'gif'){
            
            // if(petId != req.pet.sub){
            //     return res.status(500).send({message: 'No tienes permiso para actualizar la mascota'});
            // }
        
            Pet.findByIdAndUpdate(petId, {image:file_name}, {new:true}, (err,appointmentUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error al actualizar la mascota'});
                }else{
                    if(!appointmentUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar la mascota'});
                    }else{
                        res.status(200).send({pet: appointmentUpdated, image:file_name});
                    }
                }
            });

        }else{
            fs.unlink(file_path, (err)=>{
                if(err){
                    res.status(200).send({message:'fichero no guardado y no borrado'});
                }else{
                    res.status(200).send({message:'extension no valida'});
                }
            });
        }
        
    }else{
        res.status(200).send({message: 'No se han subido archivos'});
    }
    
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
    saveDate,
    getDate,
    getDates,
    getDatesByUser,
    updateDate
}