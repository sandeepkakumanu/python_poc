import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchsComponent } from './branchs/branchs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent},
    {path:'branchs',component:BranchsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
