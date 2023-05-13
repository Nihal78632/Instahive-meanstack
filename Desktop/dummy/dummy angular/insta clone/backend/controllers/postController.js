const instaposts=require('../models/postSchema')



//getting posts
exports.getpost=async(req,res)=>{
    try{

       posts= await instaposts.find()
       
       
        res.status(200).json(posts)

    }catch(err){
        res.status(401).json(err)

    }

}

//creating post
exports.createpost=async(req,res)=>{

    try{
        const newpost=new instaposts({
            name:req.body.name,
            image:req.body.image,
            posttext:req.body.posttext,
            postimage:req.body.postimage
        })
        await newpost.save()
        res.status(200).json("post created")

    }catch(err){
        res.status(401).json(err)

    }



}