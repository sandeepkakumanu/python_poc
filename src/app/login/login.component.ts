import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { PythonService } from '../python.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required]),
  });
  logindata
  user: any = "Student"
  constructor(private route: Router, private ser: PythonService, private toaster: ToastrManager) {

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

        this.logindata = res
        if (this.logindata.status == 400) {
          this.toaster.errorToastr("Username Not Found", 'Oops!')
        } else if (this.logindata.status == 401) {
          this.toaster.errorToastr("Invalid Password", 'Oops!')
        } else if (this.logindata.status == 200) {
          localStorage.setItem('id', JSON.stringify(this.logindata.data[0]))
          localStorage.setItem('role', "student")
          this.route.navigate(['/home'])
        }
      })

    } else {
      console.log(e.username);
      let obj = {
        "name": e.username,
        "role": 'admin',
        "password": e.password
      }
      this.ser.adminlogin(obj).subscribe(res => {

        this.logindata = res
        console.log(res);
        if (this.logindata.status == 400) {
          this.toaster.errorToastr("Username Not Found", 'Oops!')
        } else if (this.logindata.status == 401) {
          this.toaster.errorToastr("Invalid Password", 'Oops!')
        } else if (this.logindata.status == 200) {
          localStorage.setItem('id', JSON.stringify(this.logindata.data[0]))
          localStorage.setItem('role', "admin")
          this.route.navigate(['/home'])
        }

      })
    }

  }


  changeuser(e) {
    this.user = e
    this.loginForm.reset()
  }
}
