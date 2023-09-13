const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },

    password: {
        type: String,
        min: 6,
        max: 1024,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

const USERS=mongoose.model("USERS",userSchema);

module.exports=USERS;