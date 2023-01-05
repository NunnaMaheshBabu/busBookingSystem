import { Component } from '@angular/core';
import { BusService } from '../bus.service';
import { LoginService } from '../component/login.service';
import { SignupService } from '../component/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent {

  buses=[
    {
      busId:'',
      busNumber:'',
      source:'',
      destination:'',
      totalSeats:'',
      price:'',
      busType:''
    }
  ]
    busList:any;
   
    public user={
      id:'',
      userName:'',
      password:'',
      email:'',
      age:'',
      mobile:'',
      isActive:'',
    }
  
  
  
  
  
    constructor(private busService:BusService,
      private userService:SignupService,
      private login:LoginService) { }
  
    ngOnInit(): void {
  
      this.busService.buses().subscribe((data:any)=>{
        this.busList=data;
        console.log(this.buses);
      },
      (error)=>{
        console.log(error);
        console.log("Error in loading data")
      }
      )

      this.user=this.login.getUser();
      console.log(this.user)
        this.userService.usersList().subscribe((data:any)=>{
          this.user=data;
          console.log(this.user);
        },
        (error)=>{
          console.log(error);
          Swal.fire('Error !!', 'Error in loading data','error');
        }
        )

}

}
