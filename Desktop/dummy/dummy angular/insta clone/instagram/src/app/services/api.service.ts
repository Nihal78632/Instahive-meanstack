import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const options={
  headers:new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {




BaseUrl='http://localhost:3000'

  requests=new BehaviorSubject('')

  constructor(private http:HttpClient) { }


  //appending token
  appendtoken(){
   const token=localStorage.getItem('token')

   let headers=new HttpHeaders()

   if(token){
    headers=headers.append('verify-token',token)
    options.headers=headers
   }
   return options
  }

  //showing chats
  showmessage(toname:any,fromname:any){
    const body={
      fromname,
      toname
    }

   return this.http.post(this.BaseUrl+'/chats',body)

  }

  //send chats
  sendmessage(toname:any,fromname:any,msg:any){

    const body={
      fromname,
      toname,
      msg
    }

    return this.http.post(this.BaseUrl+'/sendchats',body)



  }

  //register
  register(name:any,email:any,password:any,image:any){

    const body={
      name,
      email,
      password,
      image
    }
    return this.http.post(this.BaseUrl+'/register',body)

  }

  //login
  login(email:any,password:any){
    const body={
      email,
      password
    }

    return this.http.post(this.BaseUrl+'/login',body)

  }

  //alldetails of user
  alldetails(name:any,email:any){

    const body={
      name,
      email
    }
    
    


    return this.http.post(this.BaseUrl+'/alldetails',body,this.appendtoken())
  }

  //allaccounts
  allaccount(){
    return this.http.get(this.BaseUrl+'/getallaccount')

  }
  //sendrequesy
  sendrequest(sendername:any,name:any,image:any){

    const body={
      sendername,
      name,
      senderimage:image
    }
    
    
    return this.http.post(this.BaseUrl+'/sendrequest',body)
  }

  //del req
  deleterequest(username:any,name:any){

    const body={
      username,
      name
    }
    return this.http.post(this.BaseUrl+'/deleterequest',body)
  }

  //accepting rq
  acceptreq(name:any,image:any,user:any){
    const body={
      name,image,user
    }
    return this.http.post(this.BaseUrl+'/acceptrequest',body)

  }

  //showing requests
  showreq(name:any){
    this.alldetails(name,localStorage.getItem('email')).subscribe((res:any)=>{
      this.requests=res.requests
      console.log(this.requests);
      
    })
  }

  //createpost
  createpost(name:any,image:any,posttext:any,postimage:any){
    const body={
      name,
      image,
      posttext,
      postimage
    }
    return this.http.post(this.BaseUrl+'/createpost',body)

  }

  // getpost
  getpost(){
    return this.http.get(this.BaseUrl+'/getpost')


  }

  //getting requests
  getreq(user:any){
    const body={
      user
    }
    return this.http.post(this.BaseUrl+'/getreq',body)

  }

    //getting friendlist
    getfriends(user:any){
      const body={
        user
      }
      return this.http.post(this.BaseUrl+'/getfriends',body)
  
    }

  

  
}
