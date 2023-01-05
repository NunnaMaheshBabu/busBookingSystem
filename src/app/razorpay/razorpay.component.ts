
import { Component,HostListener, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../component/login.service';
import { OrderService } from '../order.service';
import { BusService } from '../bus.service';
import Swal from 'sweetalert2';


declare var Razorpay: any;

@Component({
    selector: 'app-razorpay',
     templateUrl: './razorpay.component.html',
     styleUrls: ['./razorpay.component.css']
   })
   export class RazorpayComponent implements OnInit {
  
  title = 'demo';
  // userr:any | undefined;

  public userr={
    id:'',
    userName:'',
    password:'',
    email:'',
    age:'',
    mobile:'',
    isActive:'',
  
  }

  form={
    name:'',
    phoneNumber:'',
    amount:''
  }; 

 
 

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
    price: "",
    source: "",
    totalSeats: 0,
    //bookedById:0,
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
    bookedCount:0,
    seats: [
      {
        seatId: '',
        seatType: '',
        seatNumber: 0,
        seatLabel: '',
        isBooked: false,
        bookedById:'',
      }
    ]
  }

   idArray :any;
  seats = [
    {
      isBooked: true,
      availId:'',
      seatLabel: '',
      seatNumber: 0,
      seatType: ''
    }
  ]



  amount:any=5;
  totalPrice:any;
  seatNumber: number []=[];
  book:any;

bookedById: any;











  constructor(private http: HttpClient,private loginservice:LoginService,private orderservice:OrderService,
   private _router:ActivatedRoute,private router:Router, private busService:BusService) {

  }
  seatNumberString:string='';

  ngOnInit() {
  this.bookedById=this.userr.id;
  console.log(this.bookedById);
    this.busId = this._router.snapshot.params['avalBusId'];
    this.avalBusId = this._router.snapshot.params['avalBusId'];
    this.setAvailId = this._router.snapshot.params['setAvailId'];
    this.totalPrice = this._router.snapshot.params['totalPrice'];
    this.seatNumberString=this._router.snapshot.params['seatNumber'];
 
    // console.log(this.seatNumber);
    var newarr:string[] = this.seatNumberString.split(",");
   
    for(let i=0;i<newarr.length;i++){
        this.seatNumber[i]=+newarr[i];
    }
    // console.log(this.seatNumber);

     this.busService.getAvailability(this.setAvailId).subscribe(
      (data:any)=>{
      this.setAvail=data;
      console.log(data)
    },
    (error)=>{
      console.log(error);
      console.log("Error in loading data")
    }
    )

    this.userr = this.loginservice.getUser();
    // console.log(this.userr.userName)
    // console.log("totalPrice"+this.totalPrice)
   
    // console.log("setAvailId"+this.setAvailId)
    this.form.name = this.userr.userName;
    this.form.phoneNumber = this.userr.mobile;
    this.form.amount = this.totalPrice;

// console.log(this.form)
    this.onSubmit();
  }

  sayHello() {
    alert("Hello DK");
  }

 
  

  paymentId: any;
  error: any;
  
  options = {
    "key": "",
    "amount": "", 
    "name": "Coding World",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id":"",
    "handler": function (response:any){
      var event = new CustomEvent("payment.success", 
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );	  
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
  id:any;
  quantity:any;
    onSubmit(): void {
      this.paymentId = ''; 
      this.error = ''; 
      console.log("in service onsubmit");
      this.orderservice.createOrder(this.form).subscribe(
      (data:any) => {
        console.log(data);
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = this.userr.userName;
        this.options.prefill.email = this.userr.email;
        this.options.prefill.contact ="";
        
        this.options.image="";
          var rzp1 = new Razorpay(this.options); 
          rzp1.open();
        
                
        rzp1.on('payment.failed',  (response:any) =>{    
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
      }
      ,
      (err:any) => {
        this.error = err.error.message;
      }
      );
    }
 
    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event:any): void {
       console.log(event.detail);
       
       for(let i=0;i<this.seatNumber.length;i++){
        this.setAvail.seats.push({
          seatId: '', 
          seatNumber: this.seatNumber[i],
          bookedById: this.userr.id,
           isBooked: true,
          seatType: 'Seater',
          seatLabel: 'L2'
        });

      
       }
       
      
      //  this.setAvail = event.detail.razorpay_payment_id;
       this.busService.addSeats(this.setAvail).subscribe(
        
        (data:any)=>{
         
          Swal.fire('Success !!','Seats Booked Successfully','success').then(e=>{
            this.router.navigateByUrl('/viewTicket/'+this.avalBusId+'/'+this.setAvailId+'/'+this.seatNumber+'/'+this.totalPrice)
          });
        },
        (error)=>{
      console.log(error);
      
      Swal.fire('Error !!','Server error !!','error');
        }
      );
         
  

    }
  //   toBookTicket(seatNumber:any){
  //     this.seatNumber = this.activatedRouter.snapshot.params['seatNumber'];
    
  //  this.router.navigateByUrl('/viewTicket/'+this.avalBusId+'/'+this.setAvailId+'/'+seatNumber+'/'+this.totalPrice)
  //  }

        
}

