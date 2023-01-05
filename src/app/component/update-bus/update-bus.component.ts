import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/bus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-bus',
  templateUrl: './update-bus.component.html',
  styleUrls: ['./update-bus.component.css']
})
export class UpdateBusComponent implements OnInit {

  
  busId=0;
  buses:any;


  busForm=new FormGroup({
    busNumber:new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern("[A-z0-9].*")
      Validators.pattern('[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}')
]),

source:new FormControl("",[
  Validators.required,
  Validators.minLength(3),
 Validators.pattern("[a-zA-z].*")
]),

destination:new FormControl("",[
  Validators.required,
  Validators.minLength(3),
 Validators.pattern("[a-zA-z].*")
]),

totalSeats:new FormControl("",[
  Validators.required,
  // Validators.pattern("[0-9].*")
]),

price:new FormControl("",[
  Validators.required,
  // Validators.pattern("[0-9].*")
]),

busType:new FormControl("",[
  Validators.required,
]),


driverName:new FormControl("",[
  Validators.required,
  Validators.minLength(4),
  Validators.pattern("[a-zA-z].*")
]),




phoneNumber:new FormControl("",[
  Validators.required,
  Validators.pattern("[0-9].*"),
  Validators.minLength(10),
  Validators.maxLength(10)
]),

busTypee:new FormControl("",[
   Validators.required
])

 });

 get busNumber(){
  return this.busForm.get("busNumber") as FormControl;
 }

 get source(){
  return this.busForm.get("source") as FormControl;
 }
 get destination(){
  return this.busForm.get("destination") as FormControl;
 }

 get totalSeats(){
  return this.busForm.get("totalSeats") as FormControl;
 }

 get price(){
  return this.busForm.get("price") as FormControl;
 }

 
 get busType(){
  return this.busForm.get("busType") as FormControl;
 }

 get driverName(){
  return this.busForm.get("driverName") as FormControl;
 }
 
 get phoneNumber(){
  return this.busForm.get("phoneNumber") as FormControl;
 }

 get busTypee(){
  return this.busForm.get("busTypee") as FormControl;
 }





  constructor(private activatedRouter:ActivatedRoute,
    private busService:BusService,
    private router:Router) { }

  ngOnInit(): void {

    this.busId=this.activatedRouter.snapshot.params['busId'];
    

    this.busService.getBus(this.busId).subscribe(
      (data:any)=>{
        this.buses=data;
        console.log(this.buses);
      },
      (error: any)=>{
        console.log(error);
      }
    );

  }

 //update form submit
 public updateData(){
  
  this.busService.updateBus(this.buses).subscribe(
    (data:any)=>{
      Swal.fire('Success !!','Bus updated','success').then((e)=>{
        this.router.navigate(['/addBus'])
      });
    },(error)=>{
      Swal.fire('Error !!','Error in updating','error');
      console.log(error);
    }
  )
  
    }

}

