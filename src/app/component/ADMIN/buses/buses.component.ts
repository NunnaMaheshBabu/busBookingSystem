import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/bus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
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
   
  
  
  
  
  
  
    constructor(private busService:BusService) { }
  
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
}


addBus(){
  // console.log(this.buses);
  this.busService.addbus(this.buses).subscribe(
      (data:any)=>{
        // console.log(this.buses);
        // alert('Bus added Successfully')
        Swal.fire('Success !!','Bus added Successfully','success');
      },
      (error)=>{
    console.log(error);
    // alert('Error invalid')
    Swal.fire('Error !!','Server error !!','error');
      }
    );
  
   }

   //delete bus
  deleteBus(busId: any){
    Swal.fire({
     icon:'info',
     title:'Are You Sure Want To Delete This Bus?',
     cancelButtonText:'Cancel',
     showCancelButton:true,
    }).then((result)=>{
     if(result.isConfirmed){
        //delete
 
     this.busService.deleteBus(busId).subscribe(
   (data:any)=>{
    this.buses=this.buses.filter((busService)=>busService.busId !=busId);
    Swal.fire('Success','Bus Deleted','success');
   },
   (_error: any)=>{
    Swal.fire('Error','Error in deleting Bus');
   }
  );
 
     }
    })
 
   }


   



}
