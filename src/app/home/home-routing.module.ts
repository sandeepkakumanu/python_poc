import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchsComponent } from './branchs/branchs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeComponent } from './home.component';
import { StudentenrollmentComponent } from './studentenrollment/studentenrollment.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent},
    {path:'branchs',component:BranchsComponent},
    {path:'studentenroll',component:StudentenrollmentComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
