'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const Sickness = require('../models/sickness');

function saveSickness(req,res){
    var sickness = new Sickness();
    var params = req.body;

    if(params.description){
        sickness.description = params.description;

        sickness.save((err,sicknessStored)=>{
            if(err){
                res.status(500).send({message:'Error en la peticion'});
            }else{
                if(!sicknessStored){
                    res.status(404).send({message:'Error en el guardado de la enfermedad'});
                }else{
                    res.status(200).send({sicknessStored})
                }
            }
        });

    }
}

function getSicknesses(req,res){
    Sickness.find({}).exec((err,sicknesses)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!sicknesses){
                res.status(404).send({message:'no hay enfermedades'});
            }else{
                res.status(200).send({sicknesses});
            }
        }
    });
}

function getSickness(req,res){
    var SicknessID = req.params.id;
     Sickness.findById(SicknessID).exec((err,Sickness)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!Sickness){
                res.status(404).send({message:'la enfermedad no existe'});
            }else{
                res.status(200).send({Sickness});
            }
        }
     });
}

function updateSickness(req,res){
    var sicknessID = req.params.id;
    var update = req.body;

    Sickness.findByIdAndUpdate(sicknessID,update,{new:true},(err,sicknessUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!sicknessUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({sicknessUpdated});
            }
        }
    });
}

module.exports = {
    saveSickness,
    getSicknesses,
    getSickness,
    updateSickness
}