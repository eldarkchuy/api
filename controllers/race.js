'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const Race = require('../models/race');

function pruebas(req,res){
    res.status(200).send({
        message:'Testing pet controller and tests action',
        //pet: req.pet
    });
}

function saveRace(req,res){
    var race = new Race();
    var params = req.body;

    if(params.description && params.idAnimal ){

        race.idAnimal = params.idAnimal;
        race.description = params.description;
        race.status = true;
        
            //guardar en bd
            race.save((err, raceStored)=>{
                if(err){
                    res.status(500).send({message:'Error al guardar la raza'});
                }else{
                    if(!raceStored){
                        res.status(404).send({message:'Raza no registrada'});
                    }else{
                        res.status(200).send({race: raceStored});
                    }
                }
            });
        
    }else{
        res.status(200).send({
            message: 'Ingrese los datos correctamente'
        });
    }
    
}

function getRaces(req,res){
    Race.find({}).populate({path:'idAnimal'}).exec((err,races)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!races){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({races});
            }
        }
    });
}

function getRacesByTypeAnimal(req,res){
    var typeAnimalID = req.params.id;
    Race.find({idAnimal:typeAnimalID}).populate({path:'idAnimal'}).exec((err,races)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!races){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({races});
            }
        }
    });
}

function getRace(req,res){
    var raceID = req.params.id;
     Race.findById(raceID).populate({path:'idAnimal'}).exec((err,race)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!race){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({race});
            }
        }
     });
}

function updateRace(req,res){
    var raceID = req.params.id;
    var update = req.body;

    Race.findByIdAndUpdate(raceID,update,{new:true},(err,raceUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!raceUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({raceUpdated});
            }
        }
    });
}



module.exports = {
    pruebas,
    saveRace,
    getRace,
    getRaces,
    updateRace,
    getRacesByTypeAnimal
}