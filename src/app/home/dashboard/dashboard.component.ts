import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PythonService } from 'src/app/python.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service: PythonService, private toaster: ToastrManager) { 
    this.today=this.dateToYMD(new Date())
  }

  today:any
  seats: any = 30
  seatsarray: any = []
  studentdata: any
  id
  role
  branchs
  selectedbranch
  bookedUserDetails: any
  selectedSeats = []
  seatsDisplay: boolean = false
  datesDisplay: boolean = false
  timeDisplay: boolean = false
  bookingdetails: boolean = false
  fromtime: any
  totime: any
  fromdate: any
  todate: any
  roomid: any = 1
  bookbtn: boolean = false

  updatedfromdate: any
  updatedtodate: any
  updatedfromtime: any
  updatedtotime: any
  updatebookingid:any
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
    this.seatsarray = []
    for (let i = 1; i < this.seats; i++) {
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
    console.log(e);

    this.selectedSeats = []
    if (e.userDetails == null) {
      this.bookingdetails = false
      this.seatsarray[e.id].selected = true
      this.seatsarray.map(s => {
        if (s.id == e.id) {
          s.selected = true
          this.selectedSeats.push(s)
        } else {
          s.selected = false
        }
      })
    } else {
      this.bookingdetails = true
      this.setbooking(e)
    }
  }

  setbooking(e) {
    this.bookedUserDetails = null
    this.service.studentById(e.userDetails.user_id).subscribe(res => {
      console.log(res);
      this.updatebookingid=e.userDetails.booking_id
      let obj = {
        userDetails: res,
        bookingDetails: e.userDetails

      }
      console.log(obj);

      this.bookedUserDetails = obj
      
    })
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
      room_id: this.roomid
    }
    console.log(reqobj);
    this.getbookedseats(reqobj)
  }

  getbookedseats(reqobj) {
    let data
    this.service.getbookingdetails(reqobj).subscribe(res => {
      console.log(res,"data");
      data = res
      if (data.booked_Seats.length != 0) {
        this.displayseats()
        this.seatsDisplay = true
        let mydata = data.booked_Seats.filter(a => a.user_id == this.id.user_id)
        if (mydata.length != 0) {
          this.bookbtn = false
        } else {
          this.bookbtn = true
        }
        console.log(this.bookbtn);

        for (let i of data.booked_Seats) {
          let id = i.seat_no
          this.seatsarray[id].booked = true;
          this.seatsarray[id].selected = true;
          this.seatsarray[id].userDetails = i;
        }
      } else {
        this.displayseats()
        this.seatsDisplay = true
        this.bookbtn = true
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
    this.seatsDisplay = false
    this.datesDisplay = false
    this.timeDisplay = false
    this.bookingdetails = false
    this.fromtime = null
    this.totime = null
    this.fromdate = null
    this.todate = null
    this.selectedbranch = ""
    this.roomid = e
    this.updatedtotime=null
    this.updatedtodate=null
    this.updatedfromdate=null
    this.updatedfromtime=null
    this.bookbtn = false
  }

  bookseat() {
    console.log(this.selectedSeats, this.id);

    for (let i of this.selectedSeats) {
      let obj = {
        seat_no: i.id,
        branch_id: Number(this.selectedbranch),
        from_date: this.fromdate,
        to_date: this.todate,
        from_time: this.fromtime,
        to_time: this.totime,
        user_id: this.id.user_id,
        room_id: this.roomid
      }
      console.log(obj);
      let data
      this.service.bookseats(obj).subscribe(res => {
        console.log(res);
        data = res
        if (data.status == 201) {
          this.toaster.successToastr(data.message, "Success!")
          this.timeSelected()
        }


      }, err => {
        this.toaster.errorToastr("Error while booking seat", "Oops!")
      })
    }
  }

  modalsetvalues() {
    this.updatedfromdate = this.bookedUserDetails.bookingDetails.from_date
    this.updatedtodate = this.bookedUserDetails.bookingDetails.to_date
    this.updatedfromtime = this.bookedUserDetails.bookingDetails.from_time
    this.updatedtotime = this.bookedUserDetails.bookingDetails.to_time
  }

  updatedata() {
    var obj = {
      "seat_no": this.bookedUserDetails.bookingDetails.seat_no,
      "branch_id": this.bookedUserDetails.bookingDetails.branch_id,
      "from_date": this.updatedfromdate,
      "to_date": this.updatedtodate,
      "from_time": this.updatedfromtime,
      "to_time": this.updatedtotime,
      "user_id": this.bookedUserDetails.bookingDetails.user_id,
      "room_id": this.bookedUserDetails.bookingDetails.room_type
    }
    console.log(obj);
    this.service.renewalseat(obj,this.updatebookingid).subscribe(res=>{
      console.log(res);
      this.toaster.successToastr("Renewal Done !","Success")
      
    },err=>{
      this.toaster.errorToastr("Error while renewaling seat","Oops!")
    })
  }
}
