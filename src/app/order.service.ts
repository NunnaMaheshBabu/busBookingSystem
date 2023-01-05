import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  
  constructor(private http:HttpClient) { 
  }
  public createOrder(form:any){
    return this.http.post('http://localhost:8081/pg/createOrder',form);
  }    
}

