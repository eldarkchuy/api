'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const TypeAnimal = require('../models/typeAnimal');

function saveType(req,res){
    var typeAnimal = new TypeAnimal();
    var params = req.body;

    if(params.description){
        typeAnimal.description = params.description;
        typeAnimal.status = true;

        TypeAnimal.findOne({description: typeAnimal.description}, (err,type)=>{
            if(err){
                res.status(500).send({message:'Error en la conexion'});
            }else{
                if(!type){
                    typeAnimal.save((err, typeAnimalStored)=>{
                        if(err){
                            res.status(500).send({message:'Error al guardar el tipo'});
                        }else{
                            if(!typeAnimalStored){
                                res.status(404).send({message:'tipo no registrado'});
                            }else{
                                res.status(200).send({typeAnimal: typeAnimalStored});
                            }
                        }
                    });
                }
            }
        });

    }

}

function deleteAnimal(req,res){
    var typeAnimalId = req.params.id;
    var borrar = false; 

    TypeAnimal.findByIdAndUpdate(typeAnimalId, {status: borrar}, {new:true}, (err,type)=>{
        
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

function activeAnimal(req,res){
    var typeAnimalId = req.params.id;
    var add = true; 

    TypeAnimal.findByIdAndUpdate(typeAnimalId, {status: add}, {new:true}, (err,type)=>{
        
        if(err){
            res.status(500).send({message: 'Error al dar de alta'});
        }else{
            if(!type){
                res.status(404).send({message: 'No se ha podido actualizar la mascota'});
            }else{
                res.status(200).send({type});
            }
        }
    });
}

function getTypes(req,res){
    TypeAnimal.find({status: true}).populate({path:'idAnimal'}).exec((err,Types)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!Types){
                res.status(404).send({message:'no hay animales'});
            }else{
                res.status(200).send({Types});
            }
        }
    });
}

function getType(req,res){
    var TypeID = req.params.id;
     TypeAnimal.findById(TypeID).populate({path:'idAnimal'}).exec((err,Type)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!Type){
                res.status(404).send({message:'el tipo no existe'});
            }else{
                res.status(200).send({Type});
            }
        }
     });
}

module.exports = {
    saveType,
    deleteAnimal,
    activeAnimal,
    getType,
    getTypes
} 