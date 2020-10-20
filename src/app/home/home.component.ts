import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { PythonService } from '../python.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private services:PythonService) { }
  navbar:string
  role
  user
  userName:any
  warnmsg:String=""
   ngOnInit() {
    
    this.role=localStorage.getItem('role')
    console.log(this.role);
    if(this.role.toLowerCase()=="student"){
      this.user=JSON.parse(localStorage.getItem('id'))
      this.getuUserDetails(this.user.user_id)
    }
 
    
  }

  getuUserDetails(e){
    let data
    this.services.studentById(e).subscribe(res=>{
      console.log(res);
      data=res
      this.userName=data.first_name+" "+data.last_name
      this.warnmsg=data.due
    })
  }

  setvalue(e){
    this.navbar=e
  }

  logout(){
    localStorage.removeItem('id')
    localStorage.removeItem('role')
    this.router.navigate(['./login'])
  }
}
