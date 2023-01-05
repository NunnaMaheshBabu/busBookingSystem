import { Component, ViewChild } from '@angular/core';
// import {  MatTableDataSource } from '@angular/material';
import { BusService } from '../bus.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {
 
  userType='ADMIN';

  locations=[
    {
      locId:'',
      locations:''
    }];
  
    location ={
      location:''
    }
    locationArray:any;
    locationList = true;
    enableAddIcon=true;
    enableAddLocation=false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20, 25]


  // dataSource!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sortt!: MatSort;

  orderHeader: String = '';
  isDescOrder: boolean = true;
  searchInput: any = { location: ''   }
  constructor(private busService:BusService) {}

  ngOnInit(): void {
    this.getLocations();
}


applyFilter(event: any) {
  const filterValue = (event.target as HTMLInputElement).value;
  // this.dataSource.filter = filterValue.trim().toLowerCase();

  // if (this.dataSource.paginator) {
  //   this.dataSource.paginator.firstPage();
  // }
}

sort(headerName: String) {
  this.isDescOrder = !this.isDescOrder;
  this.orderHeader = headerName;
}

// for pagination
onTableDataChange(event: any) {
  this.page = event;
}

onTableSizeChange(event: any) {
  this.tableSize = event.target.value;
  this.page = 1;
}

getLocations(){
  this.busService.locations().subscribe(
    (response: any) => {
      console.log(response)
      this.locationArray = response;
    },
    (error: any) => {
      console.log(error);
      console.log("error in Locations List Fetching !!")
    }
  )
}
  //delete location
  deleteLocationById(locId: any){
    Swal.fire({
     icon:'info',
     title:'Are You Sure Want to Delete This Location?',
     cancelButtonText:'Cancel',
     showCancelButton:true,
    
    }).then((result)=>{
     if(result.isConfirmed){
        //delete
 
     this.busService.deleteLocation(locId).subscribe(
   (data:any)=>{
    this.locations=this.locations.filter((busService)=>busService.locId !=locId);
    Swal.fire('Success','LOcation Deleted','success');
   },
   (_error: any)=>{
    Swal.fire('Error','Error in deleting Location');
   }
  );
  
     }
    })
 
   }
  }


