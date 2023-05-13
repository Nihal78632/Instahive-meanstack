const express=require('express')

const cors=require('cors')

const logincontroller=require('../controllers/loginController')
const chatcontroller= require('../controllers/chatController')
const postcontroller=require('../controllers/postController')
const registercontroller =require('../controllers/registerController')

const router=new express.Router()

const server=express()

//importing jwt
const jwt=require('jsonwebtoken')




//creating middleware function
const jwtmiddleware=(req,res,next)=>{
    //getting token from headers
    const token=req.headers['verify-token']
    try{
        const data=jwt.verify(token,`${req.body.email}123`)
        next()

    }catch(err){
        res.status(401).json({message:"Please login"})
    }
}




//route for registering account
router.post('/register',registercontroller.register)

//api for logging in
router.post('/login',logincontroller.login)

//api for getting account data in homepage
router.post('/alldetails',jwtmiddleware,logincontroller.alldetails)

//api for showing chats
router.post('/chats',chatcontroller.getchat)

//route for sending chat
router.post('/sendchats',chatcontroller.sendchat)

//route for getting all account data
router.get('/getallaccount',logincontroller.fullaccount)

//route for sending requests
router.post('/sendrequest',logincontroller.addtoreq)

//route for deleting requests
router.post('/deleterequest',logincontroller.deletereq)

//route for accepting request
router.post('/acceptrequest',logincontroller.acceptreq)

//routes for getting post
router.get('/getpost',postcontroller.getpost)


//route for creating post
router.post('/createpost',postcontroller.createpost)

//route for getting friend requests
router.post('/getreq',logincontroller.getreq)

//route for getting friendlist
router.post('/getfriends',logincontroller.getfriends)









module.exports=router