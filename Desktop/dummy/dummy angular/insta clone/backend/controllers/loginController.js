
// Importing accountschema
const instacccounts=require('../models/AccountSchema')

const jwt=require('jsonwebtoken')




// login api
exports.login=async(req,resp)=>{
    


    try{
      account=  await instacccounts.findOne({
        email:req.body.email,
        password:req.body.password


        })

        const token =jwt.sign({
            loginemail:req.body.email
        },`${req.body.email}123`)
        
        
        
         
        
        resp.status(200).json({account:account,token:token})


    }catch(error){
        resp.status(404).json(error)

    }
}

//getting account data

exports.alldetails=async(req,res)=>{

    //checking account in database

    try{data=await instacccounts.findOne({
        name:req.body.name})
        

        res.status(200).json(data)
    
    
    }
    catch(err){
        res.status(404).json(err)

    }
    
}

//getting fullaccounts
exports.fullaccount=async(req,res)=>{

    //logic

   try{ const allaccount=await instacccounts.find()

    res.status(200).json(allaccount)}
   catch(err){
    res.status(404).json(err)

   }



}

//api for adding to friend request

exports.addtoreq=async(req,res)=>{

    try{reqadd=await instacccounts.findOne({
        name:req.body.name
    })
    reqadd.requests.push({name:req.body.sendername,image:req.body.senderimage})
   await reqadd.save()
    res.status(200).json("Request sent")

}
    catch(error){
        res.status(401).json(error)
    }

}

//api for declining friend request

exports.deletereq=async(req,res)=>{

    try{
        account=await instacccounts.findOne({
            name:req.body.username
        })
        account.requests= account.requests.filter((item) => item.name !== req.body.name)
       await account.save()
        res.status(200).json("req deleted successfully")


        

    }catch(err){
        res.status(401).json(err)

    }
}

//api for accepting requests
exports.acceptreq=async(req,res)=>{
    try{

        account=await instacccounts.findOne({
            name:req.body.user
            }
        )

        toaccount=await instacccounts.findOne({
            name:req.body.name
        })
        toaccount.friends.push({name:req.body.user,image:account.image})
        account.friends.push({name:req.body.name,image:req.body.image})
        account.requests = account.requests.filter(({ name }) => !req.body.name === name)
       await toaccount.save()
       await account.save()
        
        
        
        res.status(200).json("Successfully accepted the request")

    }catch(err){
        res.status(401).json(err)

    }
}

//api for getting requests
exports.getreq=async(req,res)=>{
    try{

        account=await instacccounts.findOne({
            name:req.body.user
            }
        )
        res.status(200).json(account.requests)

       

    }catch(err){
        res.status(401).json(err)

    }

}

//api for getting friendlist
exports.getfriends=async(req,res)=>{
    try{

        account=await instacccounts.findOne({
            name:req.body.user
            }
        )
        res.status(200).json(account.friends)

       

    }catch(err){
        res.status(401).json(err)

    }

}
