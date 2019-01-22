'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const VaccineAnimal = require('../models/vaccineAnimal');

function saveVaccine(req,res){
    var vaccineAnimal = new VaccineAnimal();
    var params = req.body;

    if(params.idVaccineAnimal && params.idVaccine && params.date ){

        //VaccineAnimal.idvaccine idVaccine = params.idvaccine idVaccine;
        vaccineAnimal.idVaccineAnimal = params.idVaccineAnimal;
        vaccineAnimal.idVaccine = params.idVaccine;
        vaccineAnimal.date = params.date;
        
            //guardar en bd
            vaccineAnimal.save((err, vaccineStored)=>{
                if(err){
                    res.status(500).send({message:'Error al guardar la vacuna del animal'});
                }else{
                    if(!vaccineStored){
                        res.status(404).send({message:'vacuna no registrada'});
                    }else{
                        res.status(200).send({vaccineAnimal: vaccineStored});
                    }
                }
            });
        
    }else{
        res.status(200).send({
            message: 'Ingrese los datos correctamente'
        });
    }
    
}

function getVaccines(req,res){
    VaccineAnimal.find({ })
    .populate('idvaccine','name status')
    .populate('idVaccine', 'description')
    .exec((err,vaccines)=>{
        if(err){
            res.status(500).send({
                message:'error en la vaccineicion'
            });
        }else{
            if(!vaccines){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({vaccines});
            }
        }
    });
}

function getVaccine(req,res){
    var vaccinesAnimalID = req.params.id;
     VaccineAnimal.findById(vaccinesAnimalID)
     .populate({path:'idvaccine idVaccine'}).exec((err,vaccineAnimal)=>{
        if(err){
            res.status(500).send({message:'error en la vaccineicion'});
        }else{
            if(!vaccineAnimal){
                res.status(404).send({message:'la mascota no existe'});
            }else{
                res.status(200).send({vaccineAnimal});
            }
        }
     });
}

function deleteVaccine(req,res){
    var vaccuneID = req.params.id;
    VaccineAnimal.findByIdAndRemove(vaccuneID, (err,vaccineRemoved)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!vaccineRemoved){
                res.status(404).send({message:'No se ha borrado la vacuna de la mascota'});
            }else{
                res.status(200).send({vaccine: vaccineRemoved});
            }
        }
    });
}

module.exports = {
    saveVaccine,
    deleteVaccine,
    getVaccine,
    getVaccines
}