'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const Vaccine = require('../models/vaccine');

function save(req,res){
    var vaccine = new Vaccine();
    var params = req.body;

    if(params.description){
        vaccine.description = params.description;
        vaccine.status = true;

        Vaccine.findOne({description: vaccine.description}, (err,type)=>{
            if(err){
                res.status(500).send({message:'Error en la conexion'});
            }else{
                if(!type){
                    vaccine.save((err, vaccineStored)=>{
                        if(err){
                            res.status(500).send({message:'Error al guardar el tipo'});
                        }else{
                            if(!vaccineStored){
                                res.status(404).send({message:'tipo no registrado'});
                            }else{
                                res.status(200).send({vaccine: vaccineStored});
                            }
                        }
                    });
                }
            }
        });

    }

}

function updateVaccine(req,res){
    var vaccineID = req.params.id;
    var update = req.body;

    Vaccine.findByIdAndUpdate(vaccineID,update,{new:true},(err,vaccinepdated)=>{
        if(err){
            res.status(500).send({message:'error en la vaccineicion'});
        }else{
            if(!vaccinepdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({vaccinepdated});
            }
        }
    });
}

function deleteVaccine(req,res){
    var vaccineId = req.params.id;
    var borrar = false; 

    Vaccine.findByIdAndUpdate(vaccineId, {status: borrar}, {new:true}, (err,type)=>{
        
        if(err){
            res.status(500).send({message: 'Error al eliminar'});
        }else{
            if(!type){
                res.status(404).send({message: 'No se ha podido actualizar la mascota'});
            }else{
                res.status(200).send({type});
            }
        }
    });
}

function activeVaccine(req,res){
    var vaccineId = req.params.id;
    var add = true; 

    Vaccine.findByIdAndUpdate(vaccineId, {status: add}, {new:true}, (err,type)=>{
        
        if(err){
            res.status(500).send({message: 'Error al dar de alta'});
        }else{
            if(!type){
                res.status(404).send({message: 'No se ha podido actualizar la vacuna'});
            }else{
                res.status(200).send({type});
            }
        }
    });
}

function getVaccines(req,res){
    Vaccine.find({status: true}).exec((err,vaccines)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!vaccines){
                res.status(404).send({message:'no hay vacunas'});
            }else{
                res.status(200).send({vaccines});
            }
        }
    });
}

function getVaccine(req,res){
    var vaccineID = req.params.id;
     Vaccine.findById(vaccineID).exec((err,vaccine)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!vaccine){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({vaccine});
            }
        }
     });
}

module.exports = {
    save,
    deleteVaccine,
    activeVaccine,
    updateVaccine,
    getVaccine,
    getVaccines
} 