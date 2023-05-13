import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { __values } from 'tslib';
import { Observable, filter, map, window } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // userName -> userDetails(api) -> allAccountDetails(api) -> friendSuggestions

  constructor(private api: ApiService, private activatedroute: ActivatedRoute,private routes:Router) { }

  ngOnInit(): void {
    console.log(this.searchkey);


    if(!localStorage.getItem('token')){
      alert("Please Login")
      this.routes.navigateByUrl('')
      
      
    }

    this.getpost()

    this.activatedroute.params.subscribe((res: any) => {
      this.userName = res?.name;
      this.fromname=this.userName
      let email=localStorage.getItem('email')
      this.getreq()
      this.getfriends()
      // this.alldata()

      // userDetails
      this.api.alldetails(this.userName,email).subscribe({
        next: (res1) => {
          console.log(res1);
          
          this.userDetails = res1;
          this.api.requests.next(this.userDetails.requests)
          
         
          
          

          // allAccountDetails
          this.api.allaccount().subscribe({
            next: (res2) => {
              this.allAccountDetails = res2;
              
              

              const accountDetailsAfterRemovingUserFriends = this.allAccountDetails.filter((allAccountObj: any) => {
                return !this.userDetails?.friends.some((userFriendObj: any) => userFriendObj?.name === allAccountObj?.name);
                
              });

              // friend Suggestions
              this.friendSuggestions = accountDetailsAfterRemovingUserFriends.filter((obj: any) => obj?.name !== this.userDetails?.name);
              console.log(this.friendSuggestions);
              
              
              
              
              
              // console.log(this.friendSuggestions);
              // console.log(accountDetailsAfterRemovingUserFriends);
              
              
            }
          })


        }
      })
      

      // this.userDetails$ = this.api.alldetails(this.userName);
      // this.allAccountDetails$ = this.api.allaccount();
      // this.friendSuggestions$ = this.userDetails$.pipe(
      //   map((userData) => {
      //     this.allAccountDetails$.pipe(
      //       map((allAccountDatas: any[]) => {

      //         //TODO-------------------------------------------------
      //          allAccountDatas.filter((allAccountObj: any) => {
      //           return !userData?.friends.some((userFriendObj: any) => userFriendObj?.id === allAccountObj?.id)
      //         })


      //       })
      //     )
      //   })
      // )

    })

  }

  fromname: any
  toname: any
  chats: any
  sendchats: any
  fulldata: any 
  friendsarray: any
  allaccounts: any
  selfaccount: any
  frndreq:any
  imageSrc:any
  posttext:any='' 
  tabchange:boolean=false

  tab1active:any=''
  tab2active:any=''
  requests:any
  friends:any

  userName: any;
  userDetails: any;
  allAccountDetails: any;
  friendSuggestions: any;
 posts:any
 searchkey:any =''


  userDetails$!: Observable<any>;
  allAccountDetails$!: Observable<any>;
  friendSuggestions$!: Observable<any>;




  //friend suggestion
  // friendsuggestion() {
  //   this.api.allaccount().subscribe((result: any) => {


  //     this.allaccounts = result


  //     for (var i = 0, len = this.friendsarray.length; i < len; i++) {


  //       for (var j = 0, len2 = this.allaccounts.length; j < len2; j++) {


  //         if (this.friendsarray[i].name == this.allaccounts[j].name) {
  //           this.allaccounts.splice(j, 1);
  //           len2 = this.allaccounts.length;




  //         }

  //       }
  //     }





  //     //     interface ArrayItem {
  //     //       name: string;
  //     //     }

  //     //     const newArray: ArrayItem[] = this.allaccounts.filter(({ name }: ArrayItem) =>
  //     //   !this.fulldataarray.some((e: ArrayItem) => e.name === name)
  //     // );

  //     // this.allaccounts=newArray
  //     // console.log(newArray);




  //     // this.allaccounts = this.allaccounts.filter(({ name }) => !this.fulldataarray.some((e:any) => e.name === name))




  //     // this.allaccounts = this.remove_duplicates(this.fulldataarray,this.allaccounts)






  //   })
  // }


  //getting message
  getmessage(frndname:any){
    this.toname=frndname
    
    

  

        this.api.showmessage(this.toname,this.fromname).subscribe((result:any)=>{
          console.log(this.toname);
          console.log(this.fromname);
          
          console.log(result);
          
          
          if(result==null){
            this.chats=[{name:'',message:'This is the start of your conversation with '+this.toname}]
          }else{

            this.chats=result.messages
          }
          
          
          
          
          

          

         
          

          
          
          
        })
 
  }

  //sending message

  sendmessage() {




    this.api.sendmessage(this.toname, this.fromname, this.sendchats).subscribe((result: any) => {

      this.sendchats = ''
      this.getmessage(this.toname)

    })



  }

  //alldata
  // alldata() {

  //   this.api.alldetails(this.fromname).subscribe((result: any) => {
  //     console.log(result.friends);

  //     console.log(result);





  //     this.fulldata = result
  //     this.selfaccount = result

  //     this.friendsarray = this.fulldata.friends
  //     // this.friendsarray.push(this.selfaccount)
  //     console.log(this.fulldata);


  //     //making an array of items to be removed from friend suggestions

  //     // //adding the self account to array
  //     // this.fulldataarray.push(this.fulldata)
  //     // this.fulldataarray.shift()

  //     // //adding the friends to array
  //     // for(let elem of this.fulldata.friends){
  //     //   this.fulldataarray.push(elem)


  //     // }
  //     this.friendsuggestion()







  //   })
  // }
 // sending request
  addtorequest(name:any,image:any){
    

    this.api.sendrequest(this.fromname,name,this.userDetails.image).subscribe((res:any)=>{
      console.log(res);
      
      alert(res)

      let newarray={name}
      this.friendSuggestions = this.friendSuggestions.filter((obj: any) => obj?.name !== newarray?.name);
      
    
    
      
      
      
    })


      
  }

 // for deleting requesting
  delreq(name:any){
    this.api.deleterequest(this.fromname,name).subscribe((res:any)=>{
      console.log(res);
      location.reload()
      // this.api.requests.subscribe((res:any)=>{
      //   this.frndreq=res
      //   console.log(this.frndreq);
        

      // })
      
      
      
      
    })
   

  } 

  //accept req
  acceptreq(name:any,image:any){
    let user=this.fromname

    this.api.acceptreq(name,image,user).subscribe((res)=>{
      alert(res)
      this.getreq()
      this.getfriends()
      console.log(this.requests);
      
      // this.api.requests.subscribe((res:any)=>{
      //   this.frndreq=res
      //   console.log(this.frndreq);
        

      // })
      
    })

  }

  //logout
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    this.routes.navigateByUrl('')

  }

  //uploading image
  uploadimage(event:any){
    const reader=new FileReader()

    if(event.target.files && event.target.files.length){
      const file=event.target.files[0]
      

      reader.readAsDataURL(file)

      reader.onload=()=>{
        this.imageSrc=reader.result as String;
        console.log(reader.result);
        

      }

    }

  }

  //getpost
  getpost(){
    this.api.getpost().subscribe((posts:any)=>{
    this.posts=posts.reverse()
    


      
      console.log(posts);
      
    })
  }

  //posting
  post(){
    this.api.createpost(this.userName,this.userDetails.image,this.posttext,this.imageSrc).subscribe((res:any)=>{
      alert(res)
      this.posttext=''
      this.imageSrc=''
      this.getpost()
      
      
    })


  }

  //changing tabs
  tabs1election(){
    this.tabchange=true
    this.tab1active='tabselected'
    this.tab2active=''


  }

  tab2selection(){
    this.tabchange=false
    this.tab2active='tabselected'
    this.tab1active=''


  }
  //getting requests
  getreq(){
    this.api.getreq(this.userName).subscribe((res:any)=>{
      this.requests=res

    })
  }

   //getting friends
   getfriends(){
    this.api.getfriends(this.userName).subscribe((res:any)=>{
      this.friends=res

    })
  }

  //searchbar
  search(event:any){
    this.searchkey=event.target.value

  }





  

 



}


//userdetails={"name":"meera","email":"meera@gmail.com","password":"meera","image":"https://www.hindustantimes.com/ht-img/img/2023/04/13/1600x900/Aishwarya_Rai_1664257560058_1681374094857_1681374094857.jpg","friends":[{"name":"ravi","image":"https://im.rediff.com/money/2010/nov/25rajani.jpg"},{"name":"raghu","image":"https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQrqLg47DT9DSbR7hd8uUzXdpPnjcI99psYBg7GU4j1Z-ixRLagZjCHB7sXlyQIReotc7c3M6oUiMRRZjw"}],"requests":[{"name":"pankaj","image":"https://pbs.twimg.com/profile_images/1594558797069967361/fESSG13P_400x400.jpg"}]}

//userdetails.friends=[{"name":"ravi","image":"https://im.rediff.com/money/2010/nov/25rajani.jpg"},{"name":"raghu","image":"https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQrqLg47DT9DSbR7hd8uUzXdpPnjcI99psYBg7GU4j1Z-ixRLagZjCHB7sXlyQIReotc7c3M6oUiMRRZjw"}]

// // //allaccounts=[]
// //   {"_id":{"$oid":"644291a5f318b6fbc2826d2f"},"name":"meera","email":"meera@gmail.com","password":"meera","image":"https://www.hindustantimes.com/ht-img/img/2023/04/13/1600x900/Aishwarya_Rai_1664257560058_1681374094857_1681374094857.jpg","friends":[{"name":"ravi","image":"https://im.rediff.com/money/2010/nov/25rajani.jpg"},{"name":"raghu","image":"https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQrqLg47DT9DSbR7hd8uUzXdpPnjcI99psYBg7GU4j1Z-ixRLagZjCHB7sXlyQIReotc7c3M6oUiMRRZjw"}],"requests":[{"name":"pankaj","image":"https://pbs.twimg.com/profile_images/1594558797069967361/fESSG13P_400x400.jpg"}]},
// {"_id":{"$oid":"644291fcf318b6fbc2826d30"},"name":"raghu","email":"raghu@gmail.com","password":"raghu","image":"https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQrqLg47DT9DSbR7hd8uUzXdpPnjcI99psYBg7GU4j1Z-ixRLagZjCHB7sXlyQIReotc7c3M6oUiMRRZjw","friends":[{"name":"ravi","image":"https://im.rediff.com/money/2010/nov/25rajani.jpg"},{"name":"meera","image":"https://www.hindustantimes.com/ht-img/img/2023/04/13/1600x900/Aishwarya_Rai_1664257560058_1681374094857_1681374094857.jpg"}],"requests":[{"name":"prerna","image":"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/20_years_of_trisha_in_kollywood_0-three_four.jpg?VersionId=UgA27uLvupC_Zin0Ap2ObBmTRGQRpU71"},{"name":"pankaj","image":"https://pbs.twimg.com/profile_images/1594558797069967361/fESSG13P_400x400.jpg"}],"__v":{"$numberInt":"4"}},
// {"_id":{"$oid":"64429214f318b6fbc2826d31"},"name":"ravi","email":"ravi@gmail.com","password":"ravi","image":"https://im.rediff.com/money/2010/nov/25rajani.jpg","friends":[{"name":"meera","image":"https://www.hindustantimes.com/ht-img/img/2023/04/13/1600x900/Aishwarya_Rai_1664257560058_1681374094857_1681374094857.jpg"},{"name":"raghu","image":"https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQrqLg47DT9DSbR7hd8uUzXdpPnjcI99psYBg7GU4j1Z-ixRLagZjCHB7sXlyQIReotc7c3M6oUiMRRZjw"}],"__v":{"$numberInt":"2"},"requests":[{"name":"prerna","image":"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/20_years_of_trisha_in_kollywood_0-three_four.jpg?VersionId=UgA27uLvupC_Zin0Ap2ObBmTRGQRpU71"},{"name":"pankaj","image":"https://pbs.twimg.com/profile_images/1594558797069967361/fESSG13P_400x400.jpg"}]},
// {"_id":{"$oid":"64429223f318b6fbc2826d32"},"name":"prerna","email":"prerna@gmail.com","password":"prerna","image":"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/20_years_of_trisha_in_kollywood_0-three_four.jpg?VersionId=UgA27uLvupC_Zin0Ap2ObBmTRGQRpU71","friends":[],"requests":[""]},
// {"_id":{"$oid":"64429231f318b6fbc2826d33"},"name":"pankaj","email":"pankaj@gmail.com","password":"pankaj","image":"https://pbs.twimg.com/profile_images/1594558797069967361/fESSG13P_400x400.jpg","friends":[],"requests":[]}
// // ]

// friendsuggestion=[
//   {"_id":{"$oid":"64429223f318b6fbc2826d32"},"name":"prerna","email":"prerna@gmail.com","password":"prerna","image":"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/20_years_of_trisha_in_kollywood_0-three_four.jpg?VersionId=UgA27uLvupC_Zin0Ap2ObBmTRGQRpU71","friends":[],"requests":[""]},
//   {"_id":{"$oid":"64429231f318b6fbc2826d33"},"name":"pankaj","email":"pankaj@gmail.com","password":"pankaj","image":"https://pbs.twimg.com/profile_images/1594558797069967361/fESSG13P_400x400.jpg","friends":[],"requests":[]}



// ]


