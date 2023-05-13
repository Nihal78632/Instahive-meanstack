// automatically loading env files to application
require('dotenv').config()




const express=require('express')
const server=express()
server.use(express.json({limit:'50mb'}))
server.use(
    express.urlencoded({
        limit:"50mb",
    })
)
const cors = require('cors');
//using router
server.use(cors())



//connecting database
require('./db/connection')

//importing router
const router=require('./routes/router')



server.use(router)







const PORT=3000







server.listen(PORT,()=>{
    console.log("server started");
})







