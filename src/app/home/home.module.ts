import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BranchsComponent } from './branchs/branchs.component';
import { SharedModule } from '../shared/shared/shared.module';
import { StudentenrollmentComponent } from './studentenrollment/studentenrollment.component';


@NgModule({
  declarations: [HomeComponent, DashboardComponent, BranchsComponent, StudentenrollmentComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,SharedModule
  ]
})
export class HomeModule { }
