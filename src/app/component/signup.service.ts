import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class SignupService {
  baseurl="http://localhost:8081/user/"
  

  constructor(private http:HttpClient) { }


  public addUser(user:any){
    return this.http.post('http://localhost:8081/user/addUser',user)
  }


 // userName:

 public usersList(){
   return this.http.get('http://localhost:8081/user/findAllUsers');
 }
//fetchEnableFalse
 public fetchEnableFalse(){
   return this.http.get('http://localhost:8081/user/fetchAll2');
 }

 //delete
 public deleteUser(username: any){
   return this.http.delete('http://localhost:8081/user/deleteUser/' +username);
  }

 //update user
 public updateUser(user:any){
  return this.http.put('http://localhost:8081/user/updateUser',user);
}

public getUserById(id:any){
   return this.http.get('http://localhost:8081/user/findById/'+id)
}

}
