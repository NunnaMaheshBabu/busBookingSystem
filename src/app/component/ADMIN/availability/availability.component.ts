import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/bus.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  busId = 0;
  buses: any;
  busList: any;

  setButton = true;
  showButton = false;

  set = false;
  show = true;


  setAvailabilities = {
    availableDate: '',
    setAvailId: '',
    noAvailableSeates:'',   
  }

  busById={
    busId: '',
    busNumber: "",
    busType: "",
    destination: "",
    driverName: "",
    phoneNumber: "",
    pickUpPoint:"",
    droppingPoint:"",
    price: "",
    source: "",
    totalSeats: "",
    setAvailabilities: [
      {
        availableDate: "",
        noAvailableSeates: '',
        setAvailId: ''
      }
    ],
  
  }

  setAvailForm=new FormGroup({
    availableDate:new FormControl("",[
      Validators.required,
      ]),

      noAvailableSeates:new FormControl("",[
        Validators.required,
        ]),
  });

  get availableDate(){
    return this.setAvailForm.get("availableDate") as FormControl;
   }
  
   get noAvailableSeates(){
    return this.setAvailForm.get("noAvailableSeates") as FormControl;
   }

  constructor(private activatedRouter: ActivatedRoute,
    private busService: BusService,
    private router: Router) { }

  ngOnInit(): void {

    this.busId = this.activatedRouter.snapshot.params['busId'];
     
     this.getBusById(this.busId);

    // this.busService.buses().subscribe(
    //   (data:any)=>{
    //     this.buses=data;
    //     console.log(this.buses);
    //   },
    //   (error: any)=>{
    //     console.log(error);
    //   }
    // );

  }

  getBusById(busId:any){
    this.busService.getBus(busId).subscribe(
      (res: any) => {
        this.busById = res;
        console.log(this.busById);
      }
    )
  }
  isShowAval = true;
  isSetAval = true;

  showContainer = false;
  setContainer = false;

  showAval() {
    this.isShowAval = false;
    this.isSetAval = true;
    this.showContainer = true;
    this.setContainer = false;
    this.busService.getBus(this.busById).subscribe(
      (res: any) => {
        this.busById = res;
        console.log(this.busById);
      }
    )
  }

  setAval() {
    this.isSetAval = false;
    this.isShowAval = true;
    this.setContainer = true;
    this.showContainer = false;
    this.busService.getBus(this.busById).subscribe(
      (res: any) => {
        this.busById = res;
        console.log(this.busById);
      }
    )
  }



  deleteAval(avalId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete

        this.busService.deleteAvailability(avalId).subscribe(
          (data: any) => {

            this.getBusById(this.busId);
            Swal.fire('Success', 'Availability Deleted', 'success');

            
          },
          (_error: any) => {
            Swal.fire('Error', 'Error in deleting Availability');
          }
        );

      }
    })

  }

  updateAval(avalId:any){

  }

  toBuses(){
    this.router.navigateByUrl('addBus');
  }

  setNewAvailability() {
     console.log(this.setAvailabilities);

    this.busById.setAvailabilities.push(this.setAvailabilities);

    this.busService.addbus(this.busById).subscribe(
      (data: any) => {
       
        Swal.fire('Success !!', 'Available Information Added Successfully', 'success');
        this.setAvailForm.reset();
       this.getBusById(this.busById);
       
      },
      (error) => {
        console.log(error);
        // alert('Error')
        Swal.fire('Error !!', 'Server error !!', 'error');
        //  ngform.reset();
      }
    );

  }
  // =================================================================
  //update form submit
  public updateData() {

    this.busService.updateBus(this.buses).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Bus updated', 'success').then((e) => {
          this.router.navigate(['/addBus'])
        });
      }, (error) => {
        Swal.fire('Error !!', 'Error in updating', 'error');
        console.log(error);
      }
    )

  }

  busInfo(): void {

    this.busService.buses().subscribe((data: any) => {
      this.busList = data;
      console.log(this.buses);
    },
      (error) => {
        console.log(error);
        console.log("Error in loading data")
      }
    )
  }
  bus = {
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
  };

  showAvailability(busId: any) {

    // this.busId=this.activatedRouter.snapshot.params['busId'];


    this.busService.getBus(busId).subscribe(
      (data: any) => {
        this.bus = data;
        this.show = true;
        console.log('asdfdf')
        console.log(this.bus);
      },
      (error: any) => {
        console.log(error);
      }
    );

    //  this.show=true;
    //  this.set=false;

    this.setButton = true;
    this.showButton = false;

  }

  setAvailability() {
    this.show = false;
    this.set = true;

    this.setButton = false;
    this.showButton = true;
  }


 



  //delete Availability
  deleteAvail(setAvailId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure Want To Delete This Available Date ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete

        this.busService.deleteAvailability(setAvailId).subscribe(
          (data: any) => {

            // this.newAvailability=this.newAvailability.filter((busService)=>busService.setAvailId !=setAvailId);

            this.busService.getBus(393).subscribe(
              (data: any) => {
                this.buses = data;
                console.log(this.buses);
              },
              (error: any) => {
                console.log(error);
              }
            );
            Swal.fire('Success', 'Availability Deleted', 'success');
          },
          (_error: any) => {
            Swal.fire('Error', 'Error in deleting Availability');
          }
        );

      }
    })

  }

}
