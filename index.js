'use strict'

const app = require('./app');
const mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://uzscyhmnn5eaumycyzk5:dUwgYIzHdwY7qyq6SzmJ@b8ibr8jfqjxlcxj-mongodb.services.clever-cloud.com:27017/b8ibr8jfqjxlcxj', { useNewUrlParser: true }, (err) => {
    if (!err) {
        app.listen(app.get('port'), () => {
            console.log(`El servidor corre en el http://localhost:${app.get('port')}`);
        });
    } else {
        console.log(err);
    }
});




// mongoose.Promise=global.Promise;
// mongoose.connect('mongodb://localhost:27017/adopciones',{useNewUrlParser:true})
//     .then((err)=>{
//         app.listen(3000,()=>{
//             console.log('Conexion exitosa en el puerto 3000');
//         });
            
        
//     }).catch(err => console.log(err));



//const port = process.env.port || 3000;

// app.listen(3000,()=>{
//     console.log('El servidor esta en el puerto 3000');
// });

// mongoose.connect('mongodb://localhost:27017/adopcioneSad',{useNewUrlParser:true},(err)=>{
//     if(err){
//         app.listen(3000,()=>{
//             console.log('el serviidor corre en el localhost 3000')
//         });
//     }else throw err;
    
// });