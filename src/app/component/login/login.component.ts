import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userType:any;
  id:any;
  loginData={
    userName:'',
    password:'',
  };
  constructor( private loginService:LoginService, private router:Router){}
  ngOnInit(): void {
   
  }

  formSubmit(){
    console.log('Login btn Clicked');
  
    if(this.loginData.userName.trim()==''|| this.loginData.userName==null){
      alert('userName is required')
      // this.snack.open('Username is Required !!','',{
      //   duration:3000,
      // });
      return;

    }
    
    if(this.loginData.password.trim()==''|| this.loginData.password==null){
      alert('password is required')
      // this.snack.open('Password is Required !!','',{
      //   duration:3000,
      // });
      return;

    }

    //request to server to generate token

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        console.log("line 47"+data);

      //login....
      this.loginService.loginUser(data);
      this.loginService.getCurrentUser(this.loginData.userName).subscribe(
       (user:any)=>{
        //this.login.setUser(user);
        console.log("line 54"  +user);
          user=JSON.stringify(user);
          localStorage.setItem('user',user);


          user=JSON.parse(user);
          localStorage.setItem('userType',user.userType);
          localStorage.setItem('id',user.id);
         

          this.id=localStorage.getItem('id');
          console.log('user'+this.id);
          this.userType=localStorage.getItem('userType');
          let userNew=localStorage.getItem('user');
          console.log("line 64 "+userNew);
          console.log(this.userType);
  
         
            //redirecrt---ADMIN: admin-dashboard
            //redirect-----NORMAL:normal-dashboard
  
            if(this.userType=='ADMIN'){
              //admin dashboard
              //window.location.href='/admin';
              // this.router.navigate(['/viewDashBoard'])
              window.location.href='/viewdashBoard'
              this.loginService.loginStatusSubject.next(true);
            }else if(this.userType=='NORMAL'){
              //normal user dashboard
             // window.location.href='/user-dashboard';
            //  this.router.navigate(['/viewDashBoard']);
             window.location.href='/viewdashBoard'
            }else{
              this.loginService.logout();
              
            }
             
        }
        );



      },
      error=>{
        console.log("error !!")
        console.log(error);
        alert('Invalid details try again')
        // this.snack.open('Invalid Details !! Try Again','',{
        //   duration:3000,
        // });
      }
    )
  }

}
