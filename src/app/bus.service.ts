import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  userUrl= 'http://localhost:8081/bus';

  avail: any = null;
  
  constructor(private http:HttpClient) { }
  public loginStatusSubject=new Subject<boolean>();

  public buses(){
    return this.http.get('http://localhost:8081/bus/findAllBuses');
  }

  public locations(){
    return this.http.get('http://localhost:8081/locations/fetchAll');
  }

  public sources(){
    return this.http.get('http://localhost:8081/bus/findAllSources');
  }

  public destinations(){
    return this.http.get('http://localhost:8081/bus/findAllDestinations');
  }

  public availableDates(){
    return this.http.get('http://localhost:8081/setAvailability/findAllAvailableDates');
  }
  

  public addbus(buses:any){
    console.log('asdfsdf')
    return this.http.post('http://localhost:8081/bus/add',buses);
  }


  public addSeats(seats:any){
    return this.http.post('http://localhost:8081/seat/storeSeat',seats)
  }


    //delete bus
    public deleteBus(busId:any){
      return this.http.delete('http://localhost:8081/bus/deleteBus/'+busId);
     }

 //update bus
 public updateBus(buses:any){
  return this.http.put('http://localhost:8081/bus/updateBus',buses);
}


  //get bus
  public getBus(busId:any){
    return this.http.get('http://localhost:8081/bus/findBYId/'+busId);
  }

 //get bookings
 public getBookingById(bookedById:any){
  console.log("userId"+bookedById);
    return this.http.get('http://localhost:8081/bus/getAllBusForBookings/'+bookedById)
}

  //get Availability
  public getAvailability(setAvailId:any){
    return this.http.get('http://localhost:8081/setAvailability/findById/'+setAvailId);
  }


  //get seat
  public getSeat(setAvailId:any){
    return this.http.get('http://localhost:8081/setAvailability/findById/'+setAvailId);
  }

  chechAvail(data:any) {
    return this.http.get<any>(`${this.userUrl}/findingRoute/${data.source}/${data.destination}`);
  }


  
    //delete availability
    public deleteAvailability(setAvailId:number){
      return this.http.delete('http://localhost:8081/setAvailability/deleteAvailability/'+setAvailId);
     }

     //book seat

     public addBooking(bookig:any){
      return this.http.post('http://localhost:8081/booking/addBooking',bookig);
     }


     //delete location
     public deleteLocation(locId:any){
      return this.http.delete('http://localhost:8081/locations/deleteLocation/'+locId);
     }


















     
}
