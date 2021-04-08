import mongoose from 'mongoose';

const {Schema} = mongoose ;
const {ObjectId} = mongoose.Schema;

const hotelSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required: 'Title is required'
    },
    content:{
        type:String,
        trim:true,
        required: 'Content is required',
        maxlength:1000,
    },
    location:{
        type:String,
    },
    price:{
        type:Number,
        trim:true,
        required: 'price is required'
    },
    postedBy:{
        type:ObjectId,
        ref: "User",
    },
    image:{
        data:Buffer,
        contentType:String,
        
    },
    from:{
        type:Date,
    },
    to:{
        type:Date,
    },
    bed:{
        type:Number,
    },

},{timestamps:true});

export default mongoose.model("Hotel",hotelSchema);