import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../bus.service';
import { LoginService } from '../component/login.service';

@Component({
  selector: 'app-get-tickets-user',
  templateUrl: './get-tickets-user.component.html',
  styleUrls: ['./get-tickets-user.component.css']
})
export class GetTicketsUserComponent {

 busById1:any;
  public user={
    id:'',
    userName:'',
    password:'',
    email:'',
    age:'',
    mobile:'',
    isActive:'',
  }
  
  busId: any
  avalBusId: any
  setAvailId: any
  passenger=false;
  booking =
    {

      bookingId: '',
      busId: '',
      setAvailId: '',
      avalBusId: '',
      passengerName: '',
      destination: '',
      passengerAge: '',
      phoneNumber: '',
      noOfSeats: '',

    };

  availableSeats: any;
  busById = {
    busId: '',
    busNumber: "",
    busType: "",
    destination: "",
    driverName: "",
    phoneNumber: "",
    price: 0,
    source: "",
    totalSeats: 0,
    pickUpPoint:'',
    droppingPoint:'',
    setAvailabilities: [
      {
        availableDate: "",
        noAvailableSeates: '',
        setAvailId: '',
        seats: [
          {
            seatId: '',
            seatType: '',
            seatNumber: '',
            seatLabel: '',
            isBooked: false,
            bookedById:'',
          }
        ]
      }
    ],

  }

  bookedById:any;



  setAvail = {
    setAvailId: '',
    availableDate: '',
    noAvailableSeates: 0,
    seats: [
      {
        seatId: '',
        seatType: '',
        seatNumber: '',
        seatLabel: '',
        isBooked: false,
       
      }
    ]
  }

   idArray :any;
  seats = [
    {
      isBooked: false,

      seatLabel: '',
      seatNumber: '',
      seatType: '',
      bookedById:'',
    }
  ]
  seatBooked: any;

  constructor(private activatedRouter: ActivatedRoute,
    private busService: BusService,
    private router: Router,private loginService:LoginService) { }


    seatNumber:any=[];
    totalPrice=0;

  ngOnInit(): void {
    this.user=this.loginService.getUser();
    this.bookedById=localStorage.getItem('id');
         
            this.getBookingsById(this.bookedById);
      this.passenger=true;
    this.busId = this.activatedRouter.snapshot.params['avalBusId'];
    this.avalBusId = this.activatedRouter.snapshot.params['avalBusId'];
    this.setAvailId = this.activatedRouter.snapshot.params['setAvailId'];
    this.seatNumber=this.activatedRouter.snapshot.params['seatNumber'];
    this.totalPrice=this.activatedRouter.snapshot.params['totalPrice'];
    this.busService.getBus(this.busId).subscribe(
      (res: any) => {
        this.busById = res;
        this.idArray=new Array(this.busById.totalSeats)
        console.log(this.busById);
       
      }
    );

    
// this.busService.getBookingById(this.bookedById).subscribe(
//   (response:any)=>{
//   this.busById=response;
//   console.log('booking'+this.busById)
// },
// (error)=>{
//   console.log(error);
//   console.log("Error in loading data")
// }
// )

    }

    getBookingsById(_bookedById:any){
      this.busService.getBookingById(this.bookedById).subscribe(
        (data:any)=>{
          console.log("data"+data);
          this.busById1=data;
        this.busById1=JSON.stringify(this.busById1);
        this.busById1= JSON.parse(this.busById1);
        console.log(data)
      },
      (error)=>{
        console.log(error);
        console.log("Error in loading data")
      }
      )
    }
   

}
