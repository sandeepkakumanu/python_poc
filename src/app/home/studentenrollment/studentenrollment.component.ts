import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PythonService } from 'src/app/python.service';

@Component({
  selector: 'app-studentenrollment',
  templateUrl: './studentenrollment.component.html',
  styleUrls: ['./studentenrollment.component.scss']
})
export class StudentenrollmentComponent implements OnInit {

  constructor(private service: PythonService,private toaster:ToastrManager) { }
  studnetEnrollForm = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$"),Validators.maxLength(10)])
  });
  ngOnInit(): void {
  }

  studentEnroll() {
    console.log(this.studnetEnrollForm.value);
    let data
    this.service.StudentEnrollement(this.studnetEnrollForm.value).subscribe(res => {
      data=res
      console.log(res);
      if(data.status==201){
        this.toaster.successToastr("Data Saved and Invitation send to User","Success!")
        this.studnetEnrollForm.reset()
      }
    },err=>{
      this.toaster.errorToastr("Error while creating user","Oops!")
    })
  }

  number(e){
    console.log(e.charCodeAt());
    if(e.charCodeAt() >=48 && e.charCodeAt() <=57){
      return true
    }else{
      return false
    }
  }
}
