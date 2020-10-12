import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/shared/services/service.service';
import { PythonService } from 'src/app/python.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service: PythonService) { }

  seats: any = 30
  seatsarray: any = []
  studentdata: any
  id
  role
  branchs
  selectedbranch
  selectedSeats = []
  seatsDisplay = false
  datesDisplay = false
  timeDisplay = false
  fromtime: any
  totime: any
  fromdate: any
  todate: any
  roomid: any = 1

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id'))
    this.role = localStorage.getItem('role')
    this.getallbranchs()
    this.roomselected(this.roomid)
    if (this.role.toLowerCase() == "admin") {
      this.getsudentList()
    }
  }

  displayseats() {
    this.seatsarray=[]
    for (let i = 0; i < this.seats; i++) {
      let obj = {
        id: i,
        selected: false,
        booked: false,
        userDetails: null
      }
      this.seatsarray.push(obj)
    }
  }

  getsudentList() {
    this.service.getStudentList().subscribe(res => {
      console.log(res);
      this.studentdata = res
    })
  }

  getallbranchs() {
    this.service.getBranchList().subscribe(res => {
      this.branchs = res
      console.log(this.branchs);

    })
  }

  selected(e) {
    this.selectedSeats = []
    this.seatsarray[e.id].selected = true
    this.seatsarray.map(s => {
      if (s.id == e.id) {
        s.selected = true
        this.selectedSeats.push(s)
      } else {
        s.selected = false
      }
    })
    console.log(this.selectedSeats)
  }

  selectedFun() {
    this.datesDisplay = true
  }

  dateSelected() {
    this.timeDisplay = true
    this.todateCalculate(this.fromdate)
  }

  timeSelected() {
    console.log(this.fromtime, this.totime);
    let reqobj = {
      from_date: this.fromdate,
      to_date: this.todate,
      from_time: this.fromtime,
      to_time: this.totime,
      branch_id: Number(this.selectedbranch),
      room_id:this.roomid
    }
    console.log(reqobj);
    let data
    this.service.getbookingdetails(reqobj).subscribe(res => {
      console.log(res);
      data = res
      if (data.booked_Seats.length != 0) {
        this.displayseats()
        this.seatsDisplay = true
        for (let i of data.booked_Seats) {
          let id = i.seat_no
          this.seatsarray[id].booked = true;
          this.seatsarray[id].selected = true;
          this.seatsarray[id].userDetails = i;
        }
      } else {
        this.displayseats()
        this.seatsDisplay = true
      }
    })

  }

  todateCalculate(e) {
    let date = new Date(e);
    date.setDate(date.getDate() + 30);
    this.todate = this.dateToYMD(date)
  }

  dateToYMD(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  roomselected(e) {
    console.log(e);
    this.roomid=e
  }

  bookseat(){
    console.log(this.selectedSeats,this.id);
    
    for(let i of this.selectedSeats){
      let obj={
        seat_no:i.id,
        branch_id:Number(this.selectedbranch),
        from_date:this.fromdate,
        to_date:this.todate,
        from_time:this.fromtime,
        to_time:this.totime,
        user_id:this.id.user_id,
        room_id:this.roomid
      }
      console.log(obj);
      this.service.bookseats(obj).subscribe(res=>{
        console.log(res);
      })          
    }
  }
}
