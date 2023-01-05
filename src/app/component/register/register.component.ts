import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private signupService:SignupService) { }

  public user={
    userName:'',
    password:'',
    email:'',
    age:'',
    mobile:'',
    isActive:'',
  }

  ngOnInit(): void {
  }

  registerform=new FormGroup({
    userName:new FormControl("",[
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-zA-Z].*")
    ]),
  password:new FormControl("",[
    Validators.required,
   // CustomValidators.patternValidator(),
   Validators.minLength(8),
   Validators.pattern('(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
   
   ]),
  mobile:new FormControl(" ",[
    Validators.required,
     Validators.pattern("[0-9]*"),
    Validators.minLength(10),
    Validators.maxLength(10)
  ]),
  
  email:new FormControl(" ",[
    Validators.required,
    // Validators.email
    Validators.pattern("[a-zA-Z0-9]*.(@gmail|@yahoo|@solugenix).com"),
  ]),
   });


   
  get userName(){
    return this.registerform.get("userName") as FormControl;
   }
  get password(){
    return this.registerform.get("password") as FormControl;
  }
  
  
  
 
  
  get mobile(){
    return this.registerform.get("mobile") as FormControl;
  }
  
  get email(){
    return this.registerform.get("email") as FormControl;
  }
  
  formSubmit(){
    console.log(this.user)
    if(this.user.userName == '' || this.user.userName == null){
    alert('user is required');
   
     return;
    }
   this.signupService.addUser(this.user).subscribe(
     (data)=>{
       console.log(data);
      // alert('success');
      Swal.fire('Successfully done !!','user is registered','success' );
      this.user={
       userName: '',
       password: '',
       email: '',
       age:'',
       mobile:'',
       isActive:'',
     };
     },
     (error)=>{
      console.log(error);
      alert('something went wrong');
    //  this.snack.open('Something Went wrong !!','',{
    //    duration:3000,
    //  })
     }
     );
 }
}