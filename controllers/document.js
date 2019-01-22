'use strict'

var fs = require('fs');
var path = require('path');
var pdf = require('pdfkit');



//modelos
const Document = require('../models/document');

function pruebas(req,res){
    res.status(200).send({
        message:'Testing pet controller and tests action',
        //pet: req.pet
    });
}

function saveDocument(req,res){
    var document = new Document();
    var params = req.body;

    if(params){

        document.idAnimal = params.idAnimal;
        document.idUser = params.idUser;

        document.request = null; 
        document.letter = null ;
        document.identification = null;
        document.agreement = null;

        document.requestStatus = null; 
        document.letterStatus = null;
        document.identificationStatus = null;
        document.agreementStatus = null;

        document.readyDocuments = false;
        document.status = true;

        Document.findOne({idUser:document.idUser,idAnimal:document.idAnimal},(err,documents)=>{
            if(err){
                res.status(500).send({message:"Error al comprobar la solicitud"});
            }else{
                if(documents==null || documents==undefined){
                        //guardar en bd
                        document.save((err, documentStored)=>{
                            if(err){
                                res.status(500).send({message:'Error al guardar la solicitud'});
                            }else{
                                if(!documentStored){
                                    res.status(404).send({message:'Solicitud no registrada'});
                                }else{
                                    res.status(200).send({document: documentStored});
                                }
                            }
                        });
                    
                }else{
                    res.status(200).send({message: "Ya ha hecho una solicitud a esta mascota"});
                }
            }
        });
        
    }else{
        res.status(200).send({
            message: 'Ingrese los datos correctamente'
        });
    }
    
}

function getDocument(req,res){
    var idUser = req.params.idUser;
    var idAnimal = req.params.idAnimal;

    Document.find({idUser:req.params.idUser, idAnimal:req.params.idAnimal}).exec((err,document)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!document){
                res.status(404).send({message:'No se encontro documentacion'});
            }else{
                res.status(200).send({
                    document
                });
            }
        }
    });
}

function getDocument1(req,res){
    var id = req.params.id;
    // var idAnimal = req.params.idAnimal;

    Document.findById(id).populate('idUser').populate('idAnimal').exec((err,document)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!document){
                res.status(404).send({message:'No se encontro documentacion'});
            }else{
                res.status(200).send({
                    document
                });
            }
        }
    });
}

function getDocumentByAnimal(req,res){
    var idAnimal = req.params.idAnimal;
    Document.find({ idAnimal}).populate('idUser').populate('idAnimal').exec((err,documents)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!documents){
                res.status(404).send({message:'No se encontro documentacion'});
            }else{
                res.status(200).send({
                    documents
                });
            }
        }
    });
}

function getDocumentByUser(req,res){
    var idUser = req.params.idUser;
    Document.find({ idUser}).populate('idUser').populate('idAnimal').exec((err,documents)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!documents){
                res.status(404).send({message:'No se encontro documentacion'});
            }else{
                res.status(200).send({
                    documents
                });
            }
        }
    });
}


function updateDocument(req,res){
    var petID = req.params.id;
    var update = req.body;

    Document.findByIdAndUpdate(petID,update,{new:true},(err,documentUpdated)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!documentUpdated){
                res.status(404).send({message:'No se ha actualizado'});
            }else{
                res.status(200).send({documentUpdated});
            }
        }
    });
}

function uploadRequest(req, res){
    var id = req.params.id;

    if(!req.files){
        return res.status(404).send({message:'No subio algun archivo'});
    }else{
        var archivo = req.files.request;
        var nombreCortado = archivo.name.split('.');
        var extensionArchivo = nombreCortado[nombreCortado.length-1];

        var extension = ['pdf','jpg','jpeg','png','gif'];

        if(extension.indexOf(extensionArchivo)<0){
            return res.status(404).send({message:'extension no valida, debe ser pdf'});
        }

        var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;
        var path = `./upload/documents/${nombreArchivo}`;
        archivo.mv(path,err=>{
            if(err){
                return res.status(500).send({message:'Error al mover archivo'});
            }
        });
        Document.findById(id,(err,document)=>{
            if(err){
                 return res.status(500).send({err});
            }else{
                var pathViejo = './upload/documents/'+document.request;
                console.log(pathViejo);
                //si existe elimina la anterior
                if( fs.existsSync(pathViejo) ){
                    fs.unlink(pathViejo,(err)=>{
                        if(err){
                            return res.status(404).send({message:'ocurrio un error'});
                        }
                });

                }
                document.request = nombreArchivo;
                document.save((err, documentUpdate)=>{
                    if(err){
                        res.status(404).send({message:'No se pudo actualizar el archivo'});
                    }else{
                        res.status(200).send({documentUpdate});
                        
                    }
                });
                
                
            }
        });

    }
}

function uploadLetter(req, res){
    var id = req.params.id;

    if(!req.files){
        return res.status(404).send({message:'No subio algun archivo'});
    }else{
        var archivo = req.files.letter;
        var nombreCortado = archivo.name.split('.');
        var extensionArchivo = nombreCortado[nombreCortado.length-1];

        var extension = ['pdf','jpg','jpeg','png','gif'];

        if(extension.indexOf(extensionArchivo)<0){
            return res.status(404).send({message:'extension no valida, debe ser pdf'});
        }

        var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;
        var path = `./upload/documents/${nombreArchivo}`;
        archivo.mv(path,err=>{
            if(err){
                return res.status(500).send({message:'Error al mover archivo'});
            }
        });
        Document.findById(id,(err,document)=>{
            if(err){
                 return res.status(500).send({err});
            }else{
                var pathViejo = './upload/documents/'+document.letter;
                console.log(pathViejo);
                //si existe elimina la anterior
                if( fs.existsSync(pathViejo) ){
                    fs.unlink(pathViejo,(err)=>{
                        if(err){
                            return res.status(404).send({message:'ocurrio un error'});
                        }
                });

                }
                document.letter = nombreArchivo;
                document.save((err, documentUpdate)=>{
                    if(err){
                        res.status(404).send({message:'No se pudo actualizar el archivo'});
                    }else{
                        res.status(200).send({documentUpdate});
                        
                    }
                });
                
                
            }
        });

    }
}

function uploadIdentify(req, res){
    var id = req.params.id;

    if(!req.files){
        return res.status(404).send({message:'No subio algun archivo'});
    }else{
        var archivo = req.files.identification;
        var nombreCortado = archivo.name.split('.');
        var extensionArchivo = nombreCortado[nombreCortado.length-1];

        var extension = ['pdf','jpg','jpeg','png','gif'];

        if(extension.indexOf(extensionArchivo)<0){
            return res.status(404).send({message:'extension no valida, debe ser pdf'});
        }

        var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;
        var path = `./upload/documents/${nombreArchivo}`;
        archivo.mv(path,err=>{
            if(err){
                return res.status(500).send({message:'Error al mover archivo'});
            }
        });
        Document.findById(id,(err,document)=>{
            if(err){
                 return res.status(500).send({err});
            }else{
                var pathViejo = './upload/documents/'+document.identification;
                console.log(pathViejo);
                //si existe elimina la anterior
                if( fs.existsSync(pathViejo) ){
                    fs.unlink(pathViejo,(err)=>{
                        if(err){
                            return res.status(404).send({message:'ocurrio un error'});
                        }
                });

                }
                document.identification = nombreArchivo;
                document.save((err, documentUpdate)=>{
                    if(err){
                        res.status(404).send({message:'No se pudo actualizar el archivo'});
                    }else{
                        res.status(200).send({documentUpdate});
                        
                    }
                });
                
                
            }
        });

    }
}

function uploadAgreement(req, res){
    var id = req.params.id;

    if(!req.files){
        return res.status(404).send({message:'No subio algun archivo'});
    }else{
        var archivo = req.files.agreement;
        var nombreCortado = archivo.name.split('.');
        var extensionArchivo = nombreCortado[nombreCortado.length-1];

        var extension = ['pdf','jpg','jpeg','png','gif'];

        if(extension.indexOf(extensionArchivo)<0){
            return res.status(404).send({message:'extension no valida, debe ser pdf'});
        }

        var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;
        var path = `./upload/documents/${nombreArchivo}`;
        archivo.mv(path,err=>{
            if(err){
                return res.status(500).send({message:'Error al mover archivo'});
            }
        });
        Document.findById(id,(err,document)=>{
            if(err){
                 return res.status(500).send({err});
            }else{
                var pathViejo = './upload/documents/'+document.agreement;
                console.log(pathViejo);
                //si existe elimina la anterior
                if( fs.existsSync(pathViejo) ){
                    fs.unlink(pathViejo,(err)=>{
                        if(err){
                            return res.status(404).send({message:'ocurrio un error'});
                        }
                });

                }
                document.agreement = nombreArchivo;
                document.save((err, documentUpdate)=>{
                    if(err){
                        res.status(404).send({message:'No se pudo actualizar el archivo'});
                    }else{
                        res.status(200).send({documentUpdate});
                        
                    }
                });
                
                
            }
        });

    }
}


function uploadRequestPDF(req, res){
    var myDoc = new pdf({
        margin:100
    });

    var id = req.params.id;

    var name = req.params.name;
    var lastname = req.params.lastname;
    var pet = req.params.pet;
    

    var verbo= '¡Gracias por sumarte a Adopeto '+name+' '+lastname+' '+' nos alegra que estes interesado en adoptar a '+pet+'!';
    
    var verbo2= 'Si quieres continuar con tu proceso de adopción sube este mismo documento firmado por ti y escaneado' 
    +' ademas de los otros documentos que se te pediran, identificación, carta compromiso, y nuestro contrato de adopción contigo y la mascota.'
    
    var verbo22='';
    var verbo3 = 'Estoy interesado';
    var verbo33='';
    var verbo333='';
    var verbo4 = '__________________________________________';
    var verbo5 = '';
    var verbo6 = 'ATENTAMENTE';
    var verbo66 ='';
    var verbo7= 'Departamento de Adopeto';

    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.pdf`;
    var path = `./upload/documents/${nombreArchivo}`;

    myDoc.pipe(fs.createWriteStream(path));
    
    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(14)
    .text(verbo,{
        align:'center'
    });

    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo2,{
        align:'justify'
    });

    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo22,{
        align:'justify'
    });

    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo3,{
        align:'center'
    });
    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo33,{
        align:'center'
    });
    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo333,{
        align:'center'
    });

    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo4,{
        align:'center'
    });

    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo5,{
        align:'center'
    });

    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo6,{
        align:'center'
    });
    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo66,{
        align:'center'
    });
    myDoc.moveDown()
    .font('Times-Roman')
    .fontSize(12)
    .text(verbo7,{
        align:'center'
    });
    
    myDoc.end();

    Document.findById(id,(err,document)=>{
        if(err){
             return res.status(500).send({err});
        }else{
            var pathViejo = './upload/documents/'+document.request;
            console.log(pathViejo);
            //si existe elimina la anterior
            if( fs.existsSync(pathViejo) ){
                fs.unlink(pathViejo,(err)=>{
                    if(err){
                        return res.status(404).send({message:'ocurrio un error'});
                    }
            });

            }
            document.request = nombreArchivo;
            document.save((err, documentUpdate)=>{
                if(err){
                    res.status(404).send({message:'No se pudo actualizar el archivo'});
                }else{
                    res.status(200).send({documentUpdate});
                    
                }
            });
            
            
        }
    });

}


function getFile(req,res){
    var file = req.params.file;
    var path_file = '../upload/documents/'+file;

    var pathFile = path.resolve(__dirname,path_file);

    var nombreCortado = file.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length-1];

    if( fs.existsSync(pathFile)){
        if(extensionArchivo != 'pdf'){
            res.sendFile(pathFile);
        }else{
            res.sendFile(pathFile);
        }
        
    }else{

        var pathNoFile = path.resolve(__dirname,'../assets/no-img.jpg');
        res.sendFile(pathNoFile);
        
    }
}




module.exports = {
    pruebas,
    saveDocument,
    getDocument,
    getDocument1,

    updateDocument,

    uploadRequest,
    uploadLetter,
    uploadIdentify,
    uploadAgreement,

    getFile,

    uploadRequestPDF,

    getDocumentByAnimal,
    getDocumentByUser
}