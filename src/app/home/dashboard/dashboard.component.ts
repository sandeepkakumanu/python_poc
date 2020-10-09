import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/shared/services/service.service';
import { PythonService } from 'src/app/python.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service:PythonService) { }

  seats:any=30
  seatsarray:any=[]
  studentdata:any
  id
  role
  branchs
  selectedbranch
  ngOnInit(): void {
    this.id=localStorage.getItem('id')
    this.role=localStorage.getItem('role')
    this.displayseats(this.seats)
    this.getsudentList()
    this.getallbranchs()
  }

  displayseats(e){
    for(let i=0; i<e;i++){
        let obj={
          id:i,
          selected:false,
          booked:false
        }
        this.seatsarray.push(obj)
    }
  }

  getsudentList(){
      this.service.getStudentList().subscribe(res=>{
        console.log(res);
        this.studentdata=res
        
      })
  }

  getallbranchs(){
    // this.service.getbranchdata().subscribe(res=>{
    //   this.branchs=res
    // })
  }

}
