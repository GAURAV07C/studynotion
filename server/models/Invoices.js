const mongoose = require("mongoose");

const invoicesSchema = new mongoose.Schema({
    
    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    courseName:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    pinCode:{
        type:String,
        require:true
    },
    courseID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
});

module.exports = mongoose.model("Invoices",invoicesSchema);