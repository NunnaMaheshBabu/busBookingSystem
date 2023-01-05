import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user={
    id:'',
    userName:'',
    password:'',
    email:'',
    age:'',
    mobile:'',
    userType:'',
    isActive:'',
  }
constructor(private loginService:LoginService) { }

ngOnInit(): void {
 this.user=this.loginService.getUser();

 

 
}

}
