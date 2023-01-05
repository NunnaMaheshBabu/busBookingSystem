import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './component/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'busBookigSystem';

  sideNavStatus: boolean = true;

  isloggedIn=false;

  userType:any;
  loginData={
    userName:'',
    password:'',
  };


  constructor( private loginService:LoginService, private router:Router){}

  ngOnInit(): void { 

    this.isloggedIn=this.loginService.isLoggedIn();
  }


}
