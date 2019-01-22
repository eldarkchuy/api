'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const Sterilized = require('../models/sterilized');

function saveSterilized(req,res){
    var sterilized = new Sterilized();
    var params = req.body;

    if(params.idPet){
        sterilized.idPet = params.idPet;
        sterilized.date = params.date;
        sterilized.status = params.status;

        sterilized.save((err,sterilizedStored)=>{
            if(err){
                res.status(500).send({message:'Error en la peticion'});
            }else{
                if(!sterilizedStored){ 
                    res.status(404).send({message:'no se pudieron guardar los datos'});
                }else{
                    res.status(200).send({sterilized});
                }
            }
        });
    }
}

function getPets(req,res){
    Sterilized.find({}).populate({path:'idPet'}).exec((err,sterilized)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!sterilized){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({sterilized});
            }
        }
    });
}

function getPet(req,res){
    var sterilizedId = req.params.id;
     Sterilized.findById(sterilizedId).populate({path:'idPet'}).exec((err,sterilized)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!sterilized){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({sterilized});
            }
        }
     });
}

function updatePet(req,res){
    var sterilizedId = req.params.id;
    var update = req.body;

    Sterilized.findByIdAndUpdate(sterilizedId,update,{new:true},(err,sterillizedPet)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!sterillizedPet){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({sterillizedPet});
            }
        }
    });
}



module.exports = {
    saveSterilized,
    updatePet,
    getPets,
    getPet
}