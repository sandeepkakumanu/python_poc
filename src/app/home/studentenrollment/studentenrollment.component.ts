import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PythonService } from 'src/app/python.service';

@Component({
  selector: 'app-studentenrollment',
  templateUrl: './studentenrollment.component.html',
  styleUrls: ['./studentenrollment.component.scss']
})
export class StudentenrollmentComponent implements OnInit {

  constructor(private service: PythonService) { }
  studnetEnrollForm = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)])
  });
  ngOnInit(): void {
  }

  studentEnroll() {
    console.log(this.studnetEnrollForm.value);
    this.service.StudentEnrollement(this.studnetEnrollForm.value).subscribe(res => {
      console.log(res);
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
