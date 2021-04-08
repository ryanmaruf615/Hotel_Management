import express from "express";
import {readdirSync} from 'fs';
import cors from 'cors'
import mongoose from 'mongoose';

require('dotenv').config();
 
const morgan = require('morgan');
const app = express();

//db connection 
 mongoose.connect(process.env.DATABASE,{
     useNewUrlParser:true,
     useFindAndModify:false,
     useUnifiedTopology:true,
     useCreateIndex:true,
 })
 .then(()=>{
console.log('DB Connected')
 })
 .catch((error)=>{
console.log("DB Connection Error",error);
 })

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


//route middleware
readdirSync('./routes/').map((r)=> app.use('/',require(`./routes/${r}`)));


const port = process.env.PORT || 4000 ;
app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
})

