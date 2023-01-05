import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { AddBusComponent } from './component/about/add-bus/add-bus.component';
import { AvailabilityComponent } from './component/ADMIN/availability/availability.component';
import { BookingsComponent } from './component/ADMIN/bookings/bookings.component';
import { BusesComponent } from './component/ADMIN/buses/buses.component';
import { CustomersComponent } from './component/ADMIN/customers/customers.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AvailabilityUserComponent } from './component/NORMAL/availability-user/availability-user.component';
import { BusesUserComponent } from './component/NORMAL/buses-user/buses-user.component';
import { TicketsUserComponent } from './component/NORMAL/tickets-user/tickets-user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { UpdateBusComponent } from './component/update-bus/update-bus.component';
import { Cu2Component } from './cu2/cu2.component';
import { GetAvailabilityComponent } from './get-availability/get-availability.component';
import { GetTicketsUserComponent } from './get-tickets-user/get-tickets-user.component';
import { LocationsComponent } from './locations/locations.component';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { ShowAvalComponent } from './show-aval/show-aval.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { 
  path:'' ,
   component:HomeComponent ,
    pathMatch:'full' 
  },
  { 
    path:'profile' ,
     component:ProfileComponent ,
      pathMatch:'full' 
    },
{
    path:'razorpay/:avalBusId/:setAvailId/:seatNumber/:totalPrice' ,
    component:RazorpayComponent ,
     pathMatch:'full' 
   },

    { 
      path:'updateProfile/:id' ,
       component:UpdateProfileComponent ,
        pathMatch:'full' 
      },
    
  {
    path:'login' ,
     component:LoginComponent,
      pathMatch:'full' 
    },
    {
      path:'register' ,
       component:RegisterComponent,
        pathMatch:'full' 
      },
     
    {
      path:'addBooking/:avalBusId/:setAvailId' ,
       component:BookingsComponent,
        pathMatch:'full' 
      },
      
  {
  path:'setAvailability/:busId' ,
   component:AvailabilityComponent,
    pathMatch:'full' 
  },
  {
    path:'viewBookingByAdmin' ,
     component:BookingsComponent,
      pathMatch:'full' 
    },
    {
      path:'addBus' ,
       component:BusesComponent,
        pathMatch:'full' 
      },
{
      path:'setAvailability/:busId/addBus' ,
       component:BusesComponent,
        pathMatch:'full' 
      },
      
    {
      path:'add' ,
       component:AddBusComponent,
        pathMatch:'full' 
      },
      {
        path:'updateBus/:busId' ,
         component:UpdateBusComponent,
          pathMatch:'full' 
        },
      {
        path:'viewCustomers' ,
         component:CustomersComponent,
          pathMatch:'full' 
        },
        {
          path:'viewCustomers2' ,
           component:Cu2Component,
            pathMatch:'full' 
          },
        {
          path:'viewDashBoard',
           component:DashboardComponent,
            pathMatch:'full' 
          },

          {
            path:'allBookings',
             component:AllBookingsComponent,
              pathMatch:'full' 
            },

          // _______________________________________________________NORMAL____________________________________________
          {
            path:'getAvailability' ,
             component:AvailabilityUserComponent,
              pathMatch:'full' 
            },
            
            {
              path:'showAval' ,
               component:ShowAvalComponent,
                pathMatch:'full' 
              },

            {
              path:'bookBus' ,
               component:BusesUserComponent,
                pathMatch:'full' 
              },
              {
                path:'bookTicket' ,
                 component:TicketsUserComponent,
                  pathMatch:'full' 
                },
                {
                  path:'locations' ,
                   component:LocationsComponent,
                    pathMatch:'full' 
                  },

                  {
                    path:'viewTicket/:avalBusId/:setAvailId/:seatNumber/:totalPrice' ,
                     component:TicketsUserComponent,
                      pathMatch:'full' 
                    },

                    {
                      path:'getTicketsUser/:avalBusId/:setAvailId/:seatNumber/:totalPrice' ,
                       component:GetTicketsUserComponent,
                        pathMatch:'full' 
                      },

                    
                

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
