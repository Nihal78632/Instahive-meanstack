// const db=require('./db')


// readmessage=(name,toname)=>{

//     return db.insta_chats.find({$and: [{name: name},
//     {with: toname}]}).then((result)=>
//     {

//         if(result){
           
//             return{
//                 statusCode:200,
//                 message:'Successful',
//                 chats:result[0].messages,
                
                
//             }
//         }
//     })

// }
// sendmessage=(from,toname,msg)=>{
//     return db.insta_chats.find({$and: [{name: from},
//         {with: toname}]}).then((result)=>{
//             if(result){ 
                
//                 result[0].messages.push({name:from,message:msg})

//                 result[0].save()

//                 return{
//                     statusCode:200,
//                     message:'Successful', 

//                 }
//             }
//         })



// }

// //login
// login=(email,password)=>{

//     return db.insta_accounts.findOne({
//         email,
//         password
//     }).then((result)=>{
//         if(result){

//             return{
//                 statusCode:200,
//                 message:'Successful',
//                 name:result.name
//             }



//         }
//         else{

//             return{
//                 statusCode:404,
//                 message:'failed'

//             }
//         }
//     }) 


// }

// accountdata=(name)=>{

//     return db.insta_accounts.findOne({
//         name
//     }).then((result)=>{

//         return{
//             statusCode:200,
//             message:"Successful",
//             alldata:result
//         }
//     })
// }

// module.exports={
//     readmessage,
//     sendmessage,
//     login,
//     accountdata
// }