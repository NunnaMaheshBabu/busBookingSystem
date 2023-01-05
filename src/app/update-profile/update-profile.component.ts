import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../component/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  id=0;
  user:any;

  constructor(private activatedRouter:ActivatedRoute,
    private signUpService:SignupService,
    private router:Router) { }


    ngOnInit(): void {

      this.id=this.activatedRouter.snapshot.params['id'];
      
  
      this.signUpService.getUserById(this.id).subscribe(
        (data:any)=>{
          this.user=data;
          console.log(this.user);
        },
        (error: any)=>{
          console.log(error);
        }
      );
  
    }
  
   //update form submit
   public updateData(){
    
    this.signUpService.updateUser(this.user).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Profile updated','success').then((e)=>{
          this.router.navigate(['/profile'])
        });
      },(error)=>{
        Swal.fire('Error !!','Error in updating','error');
        console.log(error);
      }
    )
    
      }
  

}
