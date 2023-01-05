import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/bus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  busId: any
  avalBusId: any
  setAvailId: any
  
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
    pickUpPoint:"",
    droppingPoint:"",
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




  setAvail = {
    setAvailId: '',
    availableDate: '',
    noAvailableSeates: 0,
    seats: [
      {
        seatId: '',
        seatType: '',
        seatNumber: 0,
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
      seatType: ''
    }
  ]


  constructor(private activatedRouter: ActivatedRoute,
    private busService: BusService,
    private router: Router) { }


  // container=document.querySelector('.container');
  // seats=document.querySelectorAll('.row.seat:not(.occupied)');
  // count=document.getElementById('count');
  // total=document.getElementById('total');
  // busSelect=document.getElementById('bus');
  // ticketPrice=this.busSelect;

  seatNumber:number[]=[];
  totalPrice=0;
  
  select(seatNumber:any){
     if(!this.seatNumber.includes(seatNumber)){
       this.seatNumber.push(seatNumber);
     }
     else{
      const index:number=this.seatNumber.indexOf(seatNumber);
      this.seatNumber.splice(index, 1);
      this.totalPrice = this.totalPrice - this.busById.price;
     }
      this.totalPrice = this.busById.price * this.seatNumber.length;
  }

  seatBooked:any;
  ngOnInit(): void {
    this.busId = this.activatedRouter.snapshot.params['avalBusId'];
    this.avalBusId = this.activatedRouter.snapshot.params['avalBusId'];
    this.setAvailId = this.activatedRouter.snapshot.params['setAvailId'];

    this.busService.getBus(this.busId).subscribe(
      (res: any) => {
        this.busById = res;
        this.idArray=new Array(this.busById.totalSeats)
        console.log(this.busById);
        for (let avail of res.setAvailabilities) {
          if (avail.setAvailId == this.setAvailId) {
            this.setAvail = avail;
            // this.setAvail.seats = this.setAvail.seats.sort(function (a: any, b: any) { return a.seatId - b.seatId });
            this.seatBooked= this.setAvail.seats.length
            console.log(this.setAvail);
          }
        }
      }
    );
  }

  

  createRange(number:number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  // showSeats(setAvailId: any) {

  //   // this.busId=this.activatedRouter.snapshot.params['busId'];


  //   this.busService.getSeat(setAvailId).subscribe(
  //     (data: any) => {
  //       this.setAvail = data;
  //        this.availableSeats = this.setAvail.seats;
  //       console.log("availableSeats----->",this.availableSeats);
  //       // availableSeats.sort((a:any,b:any) => a.seatId - b.seatId);
  //       this.availableSeats=this.availableSeats.sort();
  //       console.log('asdfdf')
  //       console.log(this.availableSeats);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }


  showContainer = false;
  bookShow(index: any) {
    this.showContainer = true;
    this.busService.getSeat(this.setAvailId).subscribe(
      (res: any) => {
        this.setAvailId = res;
        console.log(this.setAvailId);
      }
    )
  }

  addBooking() {
    this.booking.busId = this.avalBusId;
    this.booking.avalBusId = this.avalBusId;
    this.booking.setAvailId = this.setAvailId;
    console.log('bus' + this.busId);
    console.log('aval' + this.avalBusId)
    console.log('setAval' + this.setAvailId);
    this.busService.addBooking(this.booking).subscribe(
      (data: any) => {
        this.busService.getBus(this.busId);
        Swal.fire('Success !!', 'Booking added Successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error !!', 'error');
      }
    );

  }

  order(){
  this.router.navigateByUrl("/razorpay/"+this.avalBusId+'/'+this.setAvailId+'/'+this.seatNumber+'/'+this.totalPrice)
  }



  toBookTicket(seatNumber:any){
  
 this.router.navigateByUrl('/viewTicket/'+this.avalBusId+'/'+this.setAvailId+'/'+seatNumber+'/'+this.totalPrice)
 }


}
