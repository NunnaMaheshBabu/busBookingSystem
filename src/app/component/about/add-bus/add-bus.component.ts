import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusService } from 'src/app/bus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {
  buses=
  {
   
    busNumber:'',
    source:'',
    destination:'',
    totalSeats:'',
    price:'',
    busType:'',
    driverName:'',
    phoneNumber:'',
    pickUpPoint:'',
    droppingPoint:'',
  };



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

pickUpPoint:new FormControl("",[
  Validators.required,
  Validators.minLength(3),
 Validators.pattern("[a-zA-z].*")
]),

droppingPoint:new FormControl("",[
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

 get pickUpPoint(){
  return this.busForm.get("pickUpPoint") as FormControl;
 }
 get droppingPoint(){
  return this.busForm.get("droppingPoint") as FormControl;
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



constructor(private busService:BusService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

addBus(){
// console.log(this.buses);
this.busService.addbus(this.buses).subscribe(
  (data:any)=>{
    // console.log(this.buses);
    // alert('Success')
     Swal.fire('Success !!','Bus added Successfully','success');
    this.buses=
  {
   
    busNumber:'',
    source:'',
    destination:'',
    totalSeats:'',
    price:'',
    busType:'',
    driverName:'',
    phoneNumber:'',
    pickUpPoint:'',
    droppingPoint:'',
  };

  },
  (error)=>{
console.log(error);
// alert('Error')
 Swal.fire('Error !!','Server error !!','error');
  }
);

}

}
