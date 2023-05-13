import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:any
  password:any
  name:any

  constructor(private api:ApiService,private router:Router,private activatedroute:ActivatedRoute,private fb:FormBuilder){

  }

  loginform=this.fb.group({
    email:['',Validators.required],
    password:['',[Validators.pattern('[0-9a-zA-z]*'),Validators.required]]

  })



  login(){

    if(this.loginform.valid){
      let email=this.loginform.value.email
      let password=this.loginform.value.password
      this.api.login(email,password).subscribe((result:any)=>{
        console.log(result);
        
  
        if(result.account){
          this.name=result.account.name
          localStorage.setItem("email",result.account.email)
          localStorage.setItem("token",result.token)
          this.router.navigateByUrl('homepage/'+this.name)
  
          
  
  
        }else{
          alert("Invalid Details")
        }
  
      },(result:any)=>{
        alert("Invalid Details")
      })

    }else{
      alert("Invalid credentials")
    }

    

  }

}
