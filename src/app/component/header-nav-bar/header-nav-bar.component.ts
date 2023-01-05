import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header-nav-bar',
  templateUrl: './header-nav-bar.component.html',
  styleUrls: ['./header-nav-bar.component.css']
})
export class HeaderNavBarComponent implements OnInit {

  @Output() sideNavToggled= new EventEmitter<boolean>();
  menuStatus: boolean=true;

  public loggedIn=false;
    name:any;
  role:any;

    constructor( private userLoginService: LoginService, private router:Router) { }

   
 
  
  ngOnInit(): void {
    this.loggedIn=this.userLoginService.isLoggedIn();
    if(!this.loggedIn){
     this.router.navigateByUrl('');
   } 
  
  if(!this.loggedIn){}
  else{
     this.role=localStorage.getItem('role');
     this.name=localStorage.getItem('name'); 
  }
}

sideNavToggle(){
    //  this.menuStatus= !this.menuStatus;
     this.sideNavToggled.emit(this.menuStatus);
}

  logoutUser(){
    this.userLoginService.logout()
    location.reload()
     this.router.navigateByUrl('/');
  }

}
