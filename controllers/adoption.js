'use strict'

var fs = require('fs');
var path = require('path');
var moment = require('moment'); 
//modelos
const Adoption = require('../models/adoption');

function saveAdoption(req,res){
    var adoption = new Adoption();
    var params = req.body;

    if(params.idUser && params.idPet){
        adoption.idUser = params.idUser;
        adoption.idPet = params.idPet;
        adoption.date = moment().format('YYYY-MM-DD');
        adoption.status = true;

        adoption.save((err,adoptionStored)=>{
            if(err){
                res.status(500).send({message:'Error en la peticion'});
            }else{
                if(!adoptionStored){
                    res.status(404).send({message:'No se ha podido guardar el registro'});
                }else{
                    res.status(200).send({adoption});
                }
            }
        });
    }
}

function getAdoptions(req,res){
    Adoption.find({}).populate({path:'idPet'}).populate({path:'idUser'}).exec((err,adoptions)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!adoptions){
                res.status(404).send({message:'no hay adopciones'});
            }else{
                res.status(200).send({adoptions});
            }
        }
    });
}


function getAdoptionByUser(req,res){
    var idUser = req.params.id;
     Adoption.find({idUser}).populate({path:'idPet'}).populate('idUser').exec((err,adoption)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!adoption){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({adoption});
            }
        }
     });
}

function getAdoption(req,res){
    var adoptionID = req.params.id;
     Adoption.findById(adoptionID).populate({path:'idPet'}).populate('idUser').exec((err,adoption)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!adoption){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({adoption});
            }
        }
     });
}

function updateAdoption(req,res){
    var adoptionID = req.params.id;
    var update = req.body;

    Adoption.findByIdAndUpdate(adoptionID,update,{new:true},(err,AdoptionUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!AdoptionUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({AdoptionUpdated});
            }
        }
    });
}

module.exports = {
    saveAdoption,
    getAdoption,
    getAdoptions,
    getAdoptionByUser,
    updateAdoption
}