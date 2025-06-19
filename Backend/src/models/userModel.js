const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    userPassword:{
        type: String,
        required:true, 
        trim: true, 
    },
    userContact: {
        type: Number,
        required: true,
        unique: true,
        trim:true,
    },
    userAddress: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["male","female", "other"],
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = new mongoose.model("user", userSchema);