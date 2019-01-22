'use strict'

var fs = require('fs');
var path = require('path'); 
//modelos
const Address = require('../models/address');

function saveAddress(req,res){
    var address = new Address();
    var params = req.body;
    

    if(params.idUser && params.city && params.zp 
        && params.colony &&params.street && params.inNumber ){

            address.state = params.state;
            address.municipality= params.municipality;
            address.idUser = params.idUser;
            address.city = params.city;
            address.zp = params.zp;
            address.colony = params.colony;
            address.street = params.street;
            address.inNumber = params.inNumber;
            address.outNumber = params.outNumber;

            Address.findOne({idUser: address.idUser},(err,addressStored)=>{
                if(err){
                    res.status(500).send({message:'Error en la peticion'});
                }else{
                    if(!addressStored){
                        address.save((err,addressStored)=>{
                            if(err){
                                res.status(500).send({message:'Error en la peticion'});
                            }else{
                                if(!addressStored){
                                    releaseEvents.status(404).send({message:'No se guardo el registro'});
                                }else{
                                    res.status(200).send({addressStored});
                                }
                            }
                        });
                    }else{
                        res.status(200).send({message:'Ese usuario ya tiene direccion'});
                    }
                }
            });

            

    }
}

function updateAddress(req,res){
    var idUser = req.params.idUser;
    var update = req.body;

    Address.findByIdAndUpdate(idUser,update,{new:true},(err,addressUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!addressUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({addressUpdated});
            }
        }
    });
}

function getAddresses(req,res){
    Address.find({}).populate({path:'idUser'}).exec((err,addresss)=>{
        if(err){
            res.status(500).send({
                message:'error en la peticion'
            });
        }else{
            if(!addresss){
                res.status(404).send({message:'no hay direcciones'});
            }else{
                res.status(200).send({addresss});
            }
        }
    });
}

function getAddressByUser(req,res){
    var idUser = req.params.idUser;
    //  Address.find({idUser}).populate({path:'idUser'}).exec((err,address)=>{
    //     if(err){
    //         res.status(500).send({message:'error en la peticion'});
    //     }else{
    //         if(!address){
    //             res.status(404).send({message:'la direccion no existe'});
    //         }else{
    //             res.status(200).send({address});
    //         }
    //     }
    //  });

    Address.findOne({idUser}).exec((err,address)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!address){
                res.status(404).send({message:'la direccion no existe'});
            }else{
                res.status(200).send({address});
            }
        }
    });

}

module.exports = {
    saveAddress,
    getAddressByUser,
    updateAddress,
    getAddresses
}