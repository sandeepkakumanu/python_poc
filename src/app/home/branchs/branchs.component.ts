import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    branchName: new FormControl(''),
    phone_number:new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
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

}
