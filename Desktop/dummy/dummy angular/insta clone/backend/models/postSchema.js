const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    ,posttext:{
        type:String,
        
    },
    postimage:{
        type:String,
        
    },
  
})

//creating model for the account schema
const instaposts=new mongoose.model('instaposts',postSchema)

//exporting
module.exports=instaposts
