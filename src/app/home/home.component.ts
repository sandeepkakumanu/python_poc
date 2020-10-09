import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
  navbar:string="DashBoard"
  ngOnInit(): void {
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
