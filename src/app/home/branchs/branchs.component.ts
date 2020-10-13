import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PythonService } from 'src/app/python.service';


@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.scss']
})
export class BranchsComponent implements OnInit {
  id
  role
  data: any;
  constructor(private service: PythonService) {
    this.id = localStorage.getItem('id')
    this.role = localStorage.getItem('role')


  }

  branchForm = new FormGroup({
    branchName: new FormControl('',[Validators.required,Validators.minLength(6)]),
    phone_number:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address: new FormGroup({
      street: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zip: new FormControl('',[Validators.required,Validators.maxLength(6),Validators.minLength(6)])
    })
  });

  // branchdataList
  ngOnInit(): void {
    this.getBranchLists()
  }


  createBranch() {
    let dummy = this.branchForm.value
    let date = new Date()
    let address=this.branchForm.value.address.street+","+this.branchForm.value.address.city+","+this.branchForm.value.address.state+","+this.branchForm.value.address.zip
    let obj = {
      "branch_name": dummy.branchName,
      "address": address,
      "created_Date": date,
      "phone_number":dummy.phone_number,
      "room_id":1
    }
    console.log(obj);
    this.service.createbranch(obj).subscribe(res => {
      console.log(res);
      this.getBranchLists()
    })
  }


  getBranchLists() {
    this.service.getBranchList().subscribe(res => {
      this.data = res
      console.log(this.data)
      for(let i of this.data){
        console.log(i.address);
        // let d=JSON.parse(i.address)
        // i.address=d
      }
      console.log(this.data,"afterchange");
      
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
