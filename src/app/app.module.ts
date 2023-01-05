import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavBarComponent } from './component/header-nav-bar/header-nav-bar.component';
import { BusesComponent } from './component/ADMIN/buses/buses.component';
import { AvailabilityComponent } from './component/ADMIN/availability/availability.component';
import { BookingsComponent } from './component/ADMIN/bookings/bookings.component';
import { CustomersComponent } from './component/ADMIN/customers/customers.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AboutComponent } from './component/about/about.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SideNavBarComponent } from './component/side-nav-bar/side-nav-bar.component';
import { BusesUserComponent } from './component/NORMAL/buses-user/buses-user.component';
import { AvailabilityUserComponent } from './component/NORMAL/availability-user/availability-user.component';
import { TicketsUserComponent } from './component/NORMAL/tickets-user/tickets-user.component';
import { RegisterComponent } from './component/register/register.component';
import { FormControl, FormGroup, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddBusComponent } from './component/about/add-bus/add-bus.component';
import { UpdateBusComponent } from './component/update-bus/update-bus.component';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatIconModule} from '@angular/material/icon';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { GetAvailabilityComponent } from './get-availability/get-availability.component';
import { LocationsComponent } from './locations/locations.component'
import {MatTreeModule} from '@angular/material/tree';
import { Cu2Component } from './cu2/cu2.component';
import { ShowAvalComponent } from './show-aval/show-aval.component';
import { RazorpayComponent } from './razorpay/razorpay.component';
import {MatCardModule} from '@angular/material/card';
import { GetTicketsUserComponent } from './get-tickets-user/get-tickets-user.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SideNavBarComponent,
    HeaderNavBarComponent,
    BusesComponent,
    AvailabilityComponent,
    BookingsComponent,
    CustomersComponent,
    ProfileComponent,
    DashboardComponent,
    AboutComponent,
    BusesUserComponent,
    AvailabilityUserComponent,
    TicketsUserComponent,
    RegisterComponent,
    AddBusComponent,
    UpdateBusComponent,
    UpdateProfileComponent,
    GetAvailabilityComponent,
    LocationsComponent,
    Cu2Component,
    ShowAvalComponent,
    RazorpayComponent,
    GetTicketsUserComponent,
    AllBookingsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OrderModule,
    FilterPipeModule,
    NgxPaginationModule,
    MatIconModule,
    MatTreeModule,
    MatCardModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
