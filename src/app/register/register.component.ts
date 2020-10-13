import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PythonService } from '../python.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userdata: any
  msg: any
  msgStatus = false
  signUpForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    first_name: new FormControl('', [Validators.required,]),
    last_name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormGroup({
      street: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zip: new FormControl('',[Validators.required])
    })
  })


  onSubmit() {

    let address = this.signUpForm.value.address.street + "," + this.signUpForm.value.address.city + "," + this.signUpForm.value.address.state + "," + this.signUpForm.value.address.zip
    let reqobj = {
      "first_name": this.signUpForm.value.first_name,
      "last_name": this.signUpForm.value.last_name,
      "address": address,
      "gender": this.signUpForm.value.gender,
      "password": this.signUpForm.value.password,
      "user_id": this.userdata[0].user_id
    }
    console.log(reqobj);
    this.services.sigunupLink(this.userdata[0].user_id, reqobj).subscribe(res => {
      console.log(res);

    })
  }

  link: any
  constructor(private router: ActivatedRoute, private services: PythonService) {
    this.link = this.router.snapshot.queryParams
    this.services.linkValidation(this.link.studnet_link).subscribe(res => {
      console.log(res);

      this.userdata = res
      if (!this.userdata.message) {
        this.msgStatus = false
        this.signUpForm.controls.userName.setValue(this.userdata[0].username)
        this.signUpForm.controls.email.setValue(this.userdata[0].email)
        this.signUpForm.controls.phone_number.setValue(this.userdata[0].phone_number)
      }
      else {
        this.msgStatus = true
        this.msg=this.userdata.message
      }
    })
  }

  ngOnInit(): void {
  }

}
