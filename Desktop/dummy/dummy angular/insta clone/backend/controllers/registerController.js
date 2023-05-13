const instacccounts=require ('../models/AccountSchema')

exports.register=async(req,res)=>{
    try{

        const newaccount=new instacccounts({
            name:req.body.name,
            image:req.body.image,
            email:req.body.email,
            password:req.body.password,
            requests:[],
            friends:[]
        })
        await newaccount.save()
        res.status(200).json("Account created Successfully")
 
     }catch(err){
         res.status(401).json(err)
 
     }

}