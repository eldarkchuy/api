'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var app = express();
//cargar las rutas
const userRoutes = require('./routes/user');
const petRoutes = require('./routes/pet');
const typeAnimalRoutes = require('./routes/typeAnimal');
const vaccinesRoutes = require('./routes/vaccine');
const vaccinesAnimalRoutes = require('./routes/vaccineAnimal');
const sterilizedRoutes = require('./routes/sterilized');
const adoptionRoutes= require('./routes/adoption');
const appoinmentRoutes= require('./routes/appoinment');
const raceRoutes= require('./routes/race');
const sicknessRoutes= require('./routes/sickness');
const sicknessAnimalRoutes = require('./routes/sicknessAnimal');
const addressRoutes = require('./routes/address');
const documentRoutes = require('./routes/document');

//middlewarestl
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.status(200).send({message:'hola mundo'});
});

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
})
//correr rutas middleware
app.use('/users',userRoutes);
app.use('/pets',petRoutes);
app.use('/typeAnimals',typeAnimalRoutes);
app.use('/vaccines',vaccinesRoutes);
app.use('/vaccinesAnimal',vaccinesAnimalRoutes);
app.use('/sterilized',sterilizedRoutes);
app.use('/race',raceRoutes);
app.use('/adoptions',adoptionRoutes);
app.use('/appointment',appoinmentRoutes);
app.use('/sickness',sicknessRoutes);
app.use('/sicknessAnimal',sicknessAnimalRoutes);
app.use('/address',addressRoutes);
app.use('/document',documentRoutes);

module.exports = app;