const mongoose=require('mongoose');
const PLACES=require('./place')

const bookingSchema= new mongoose.Schema({
    place:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:PLACES
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true

    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut: {
        type: Date,
        required: true
    },
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    numberOfGuests:{
        type:Number,
        required:true
    },
   
})

const BOOKING=new mongoose.model("BOOKING",bookingSchema);

module.exports=BOOKING