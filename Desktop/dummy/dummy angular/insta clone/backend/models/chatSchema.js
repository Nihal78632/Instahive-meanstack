const mongoose=require('mongoose')

const chatSchema=new mongoose.Schema({
    name:{
        type:String,
        
    },
    with:{
        type:String,
        
    },
    
    messages:{
        type:Array
       

    }
})

//creating model for the account schema
const instachats=new mongoose.model('instachats',chatSchema)

//exporting
module.exports=instachats
