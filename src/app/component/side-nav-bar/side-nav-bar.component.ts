import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  @Input()  sideNavStatus: boolean = true;
  loggedIn=true;
  userType:any;
  constructor(private loginService:LoginService,private router:Router) { }
  ngOnInit(): void { 
    
    this.loggedIn=this.loginService.isLoggedIn();
    this.userType=localStorage.getItem('userType');
  }

  logoutUser(){
    this.loginService.logout() 
     this.router.navigateByUrl('/');
    location.reload();
  }


  

}
