import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from 'src/app/bus.service';

@Component({
  selector: 'app-availability-user',
  templateUrl: './availability-user.component.html',
  styleUrls: ['./availability-user.component.css']
})
export class AvailabilityUserComponent implements OnInit {
  showContainer=false;
  buses=[
    {
      busId:'',
      busNumber:'',
      source:'',
      destination:'',
      totalSeats:'',
      price:'',
      busType:''
    },
    
  ]

  newAvailability = [{
    availableDate: '',
    setAvailId: 0,
    noAvailableSeates:'',
  },
]
    busList:any;
    locationArray:any;
    avails: any[] = [];
    check: any;
     show=false;

   buses1= [{
      busId: '',
      busNumber: "",
      busType: "",
      destination: "",
      driverName: "",
      phoneNumber: "",
      price: "",
      setAvailabilities: [
        {
          availableDate: "",
          noAvailableSeates: '',
          setAvailId: ''
        }
      ],
      source: "",
      totalSeats: ''
    }]
  
  setAvailabilities: any;




  checkForm=new FormGroup({
     source:new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z].*")
     ]),

     destination:new FormControl("",[
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z].*")
     ])
  });

  get source(){
    return this.checkForm.get("source") as FormControl;
  }

  get destination(){
    return this.checkForm.get("destination") as FormControl;
  }




  constructor(private busService:BusService , private router:Router) { }
  
  ngOnInit(): void {

    this.busService.locations().subscribe((data:any)=>{
      this.locationArray=data;
      console.log(this.locationArray);
    },
    (error)=>{
      console.log(error);
      console.log("Error in loading data")
    }
    )
}



  
 
  checkAvail(checkAvailForm:any) {
    this.busService.chechAvail(checkAvailForm.value).subscribe(data => {
      console.log("Resp---->",data)
      if (data.length > 0) {
        this.buses1 = data;
        // alert('Availability Check Successfully');
        this.check = true;
         this.busService.avail = true;
        //  this.router.navigateByUrl('/showAval')
        checkAvailForm.reset();
      } else {
        console.log(data);
        alert('No Availability on that route');
        checkAvailForm.reset();
        this.check = false;
      }
    });
  }
  
  avalBus:any;

  avalBusId:any;

  showAval(index:any,busId:any) {
     this.avalBusId = busId;
    this.showContainer = true
     this.avalBus = this.buses1[index].setAvailabilities;
  }

  toBookTicket(setAvailId:any){
     this.router.navigateByUrl('/addBooking/'+this.avalBusId+'/'+setAvailId)
  }


}

