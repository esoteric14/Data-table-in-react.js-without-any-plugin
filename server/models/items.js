const mongoose = require("mongoose");

const  ItemSchema = new mongoose.Schema({
    Ino:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    }
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;