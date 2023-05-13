const instachats = require('../models/chatSchema')


//api for getting chats
exports.getchat=async(req,res)=>{


   try{ chat=await instachats.find({$and: [{name: req.body.fromname},{with: req.body.toname}]})


   if(chat){
    
    res.status(200).json(chat[0])

   }else{
    res.status(404).json("This is the start of your conversation")


   }



}
   catch(error){

    res.status(404).json(error)

   }
                


}

//api for sending chats

exports.sendchat=async(req,res)=>{

   //logic
   try{
      const {fromname,toname,msg}=req.body

      sentchat=await instachats.findOne({
         name:req.body.fromname,
         with:req.body.toname
      })

      //if chat is present then add message into array
      if(sentchat){
         sentchat.messages.push({name:req.body.fromname,message:req.body.msg})
        

        

            alternatechat=await instachats.findOne({
               name:req.body.toname,
         with:req.body.fromname
          
            })
            alternatechat.messages.push({name:req.body.fromname,message:req.body.msg})


            await sentchat.save()
            await alternatechat.save()
            
            res.status(200).json("chats sent")
   
            



         

         



        




      }
      else{
         //if chat is not present then create a chat
         const newchat=new instachats({
            name:fromname,
            with:toname,
            messages:[{name:fromname,message:msg}]
         })
         const newchat2=new instachats({
            name:toname,
            with:fromname,
            messages:[{name:fromname,message:msg}]
         })
        await newchat.save()
        await newchat2.save()
        res.status(200).json("chats created and sent")

      }

   }catch(err){
      res.status(404).json("error")

   }



}