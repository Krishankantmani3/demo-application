import mongoose from 'mongoose';
let config = require('../../app/config/config.json');

export default function setMongooseConfig(){
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("open ---- > ");
    });

    db.on('connected', ()=>{
        console.log('connected');
    });
    
    db.on('disconnected', ()=>{
        console.log("disconnected");
    });

    
    mongoose.connect(config.MONGO_URI[config.ENV], {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
        if(err){
            console.log("error at connection of mongodb");
        }
        else{
            console.log("connected well");
            
        }
    });
}
