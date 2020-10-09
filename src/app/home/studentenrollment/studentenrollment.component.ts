import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PythonService } from 'src/app/python.service';

@Component({
  selector: 'app-studentenrollment',
  templateUrl: './studentenrollment.component.html',
  styleUrls: ['./studentenrollment.component.scss']
})
export class StudentenrollmentComponent implements OnInit {

  constructor(private service:PythonService) { }
  studnetEnrollForm = new FormGroup({
    username: new FormControl(''),
    email:new FormControl(''),
    phone_number:new FormControl('')
  });
  ngOnInit(): void {
  }

  studentEnroll(){
    console.log(this.studnetEnrollForm.value);
    this.service.StudentEnrollement(this.studnetEnrollForm.value).subscribe(res=>{
      console.log(res);
    })
  }
}
