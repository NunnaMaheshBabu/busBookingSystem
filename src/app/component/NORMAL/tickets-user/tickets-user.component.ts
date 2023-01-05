import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/bus.service';
import { LoginService } from '../../login.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tickets-user',
  templateUrl: './tickets-user.component.html',
  styleUrls: ['./tickets-user.component.css']
})
export class TicketsUserComponent implements OnInit {

  public user={
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
      seatType: ''
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
            this.busId
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
        // for (let avail of res.setAvailabilities) {
        //   if (avail.setAvailId == this.setAvailId) {
        //     this.setAvail = avail;
        //     this.setAvail.seats = this.setAvail.seats.sort(function (a: any, b: any) { return a.seatId - b.seatId });
        //     console.log("ass" + this.setAvail.seats);
        //     this.seatBooked= this.setAvail.seats.length

        //     console.log(this.setAvail);
        //   }
        // }
      }
    );


  }
  order(){
    this.router.navigateByUrl("/razorpay")
  }

  public makepdf(): void {

    let DATA: any = document.getElementById('htmlData');
  
    html2canvas(DATA).then((canvas) => {
  
      let fileWidth = 208;
  
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
  
      const FILEURI = canvas.toDataURL('image/png');
  
      let PDF = new jsPDF('p', 'mm', 'a4');
  
      let position = 0;
  
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  
      PDF.save('result.pdf');
  
    });
  
  }
  booking1(){
    this.router.navigateByUrl("/getTicketsUser/"+this.avalBusId+'/'+this.setAvailId+'/'+this.seatNumber+'/'+this.totalPrice)
    }
}
