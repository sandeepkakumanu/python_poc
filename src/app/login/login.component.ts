import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PythonService } from '../python.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });
  logindata
  user: any = "Student"
  constructor(private route: Router, private ser: PythonService,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }


 

  login(e) {
    
    if (this.user == "Student") {
      let obj = {
        "email": e.username,
        "role": 'student',
        "password": e.password
      }
      console.log(obj);
      
      this.ser.studentlogin(obj).subscribe(res => {
       console.log(res);
       
        this.logindata=res
        localStorage.setItem('id',JSON.stringify(this.logindata.data[0]))
        localStorage.setItem('role',"Student")
        this.route.navigate(['/home'])
      })
     
    } else {
      console.log(e.username);
      let obj = {
        "name": e.username,
        "role": 'admin',
        "password": e.password
      }
      this.ser.adminlogin(obj).subscribe(res => {
      
        this.logindata=res
        localStorage.setItem('id',this.logindata.data)
        localStorage.setItem('role',"admin")
        this.route.navigate(['/home'])
      })
    }

  }


  changeuser(e) {
    this.user = e
  }
}
