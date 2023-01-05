import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { SignupService } from '../../signup.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  title='pagination';
  POSTS:any;
  page:number=1;
  count:number=0;
  tableSize:number=10;
  tableSizes:any=[5,10,15,20];

  user1:any;

  orderHeader:any
  isDescOrder:boolean =true
 
  public user={
    id:'',
    userName:'',
    email:'',
    age:'',
    mobile:'',
    isActive:'',
  }
 searchInput :any={id:'',email: "",userName:"", mobile: "",}


 sort(headerName:String){
  this.isDescOrder=!this.isDescOrder;
  this.orderHeader=headerName;
 }
  constructor(private userService:SignupService,private login:LoginService) { }

  ngOnInit(): void {
  this.user=this.login.getUser();
  console.log(this.user)
    this.userService.usersList().subscribe((data:any)=>{
      this.user=data;
      console.log(this.user);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!', 'Error in loading data','error');
    }
    )



  }

  // //fetchEnableFalse
  //   fetchEnableFalse(){
  //     this.user=this.login.getUser();
  //     console.log(this.user)
  //     this.studentService.fetchEnableFalse().subscribe((data:any)=>{
  //       this.students=data;
  //       console.log(this.students);
  //     },
  //     (error)=>{
  //       console.log(error);
  //       Swal.fire('Error !!' ,'Error in loading data','error');
  //     })
  //   }


   //delete student
   
   deleteUser(userName: any){
    Swal.fire({
      icon:'info',
      title: 'Are You Sure Want To Delete This Customer ?',
      confirmButtonText: 'Ok',
      showCancelButton :true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
           
        this.userService.deleteUser(userName).subscribe(
  (data:any)=>{
    // this.students=this.students.filter((studentService)=>this.studentService.userName !=userName);
   Swal.fire('Success','User Deleted','success');
   this.ngOnInit();
  },
  (_error)=>{
   Swal.fire('Error','Error in deleting User ','error');
  }
 );

      }
    });

  }

  onTableDataChange(event:any){
    this.page=event;
    this.ngOnInit();
  }

  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.ngOnInit();
  }

}
