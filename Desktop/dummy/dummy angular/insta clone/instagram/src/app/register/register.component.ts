import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  bannerImage:any
  bannerImageSrc:any

  image:any 

  constructor(private Formbuilder:FormBuilder,private api:ApiService,private route:Router){}

  registerform=this.Formbuilder.group({
    name:['',[Validators.required,Validators.pattern('[a-z A-Z]*')]],
    email:['',Validators.required],
    password:['',[Validators.pattern('[0-9a-zA-z]*'),Validators.required]],
    

  })

  uploadimage(event:any){
    const reader=new FileReader()

    if(event.target.files && event.target.files.length){
      const file=event.target.files[0]
      this.bannerImage=file.name

      reader.readAsDataURL(file)

      reader.onload=()=>{
        this.bannerImageSrc=reader.result as String;
        console.log(reader.result);
        

      }

    }
    
  }

  //registering
  register(){

    if(this.registerform.valid){
      let name=this.registerform.value.name
      let email=this.registerform.value.email
      let password=this.registerform.value.password

      this.api.register(name,email,password,this.bannerImageSrc).subscribe((res:any)=>{
        alert(res)
        this.route.navigateByUrl('')
      })

      

    }
    else{
   console.log(this.registerform.value.email);
   
      
      alert("Invalid details")
    }

  }

}
