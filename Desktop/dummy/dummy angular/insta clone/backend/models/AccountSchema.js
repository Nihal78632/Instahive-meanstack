const mongoose=require('mongoose')

const accountSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    ,password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    friends:{
        type:Array
    },
    requests:{
        type:Array
    }
})

//creating model for the account schema
const instacccounts=new mongoose.model('instacccounts',accountSchema)

//exporting
module.exports=instacccounts
