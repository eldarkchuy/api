'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const SicknessAnimal = require('../models/sicknessAnimal');

function saveSicknessAnimal(req,res){
    var sicknessAnimal = new SicknessAnimal();
    var params = req.body;

    if(params.idPet && params.idSickness){
        sicknessAnimal.idPet = params.idPet;
        sicknessAnimal.idSickness = params.idSickness;
        sicknessAnimal.status = params.status;

        sicknessAnimal.save((err,sicknessAnimalStored)=>{
            if(err){
                res.status(500).send({message:'Error en la peticion'});
            }else{
                if(!sicknessAnimalStored){
                    releaseEvents.status(404).send({message:'No se guardo el registro'});
                }else{
                    res.status(200).send({sicknessAnimalStored});
                }
            }
        });
    }
    
}

function getSicknessPets(req,res){
    SicknessAnimal.find({}).populate({path:'idPet'}).exec((err,sicknessAnimals)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!sicknessAnimals){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({sicknessAnimals});
            }
        }
    });
}

function getPet(req,res){
    var sicknessAnimalID = req.params.id;
     SicknessAnimal.findById(sicknessAnimalID).populate({path:'idPet'}).exec((err,sicknessAnimal)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!sicknessAnimal){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({sicknessAnimal});
            }
        }
     });
}

function updatePet(req,res){
    var sicknessAnimalID = req.params.id;
    var update = req.body;

    SicknessAnimal.findByIdAndUpdate(sicknessAnimalID,update,{new:true},(err,sicknessAnimalUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!sicknessAnimalUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({sicknessAnimalUpdated});
            }
        }
    });
}

module.exports ={
    saveSicknessAnimal,
    getPet,
    getSicknessPets,
    updatePet
}