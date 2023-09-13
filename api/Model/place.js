const mongoose =require('mongoose');
const USERS = require('./user');

const placeSchema=new mongoose.Schema({
    owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:USERS
    },
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price:Number
})

const PLACES=mongoose.model("PLACES",placeSchema);
module.exports=PLACES;