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
  form: any;
  submitted:any;
  signUpForm=new FormGroup({
    userName:new FormControl('',[
      Validators.required,
      Validators.minLength(15)]),
    email:new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone_number:new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    first_name:new FormControl('', [Validators.required,]),
    last_name:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirm_password:new FormControl('',[Validators.required,Validators.minLength(8)]),
  })
 
  get forms(){
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;

    
    if (this.signUpForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)')
}
  
  link:any
  constructor(private router:ActivatedRoute, private services:PythonService) {
    this.link=this.router.snapshot.queryParams
    console.log(this.link.studnet_link);
    this.services.linkValidation(this.link).subscribe(res=>{
      console.log(res);
      
    })
   }

  ngOnInit(): void {
  }

}
