import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PythonService {
  branchcrt(obj: { "branchName": any; "address": any; "created_Date": Date; "flage": boolean; }) {
    throw new Error("Method not implemented.");
  }

  ip="192.168.2.118:8000"
  constructor(private service:HttpClient) { }

  getBranchList(){
    return this.service.get("http://"+this.ip+"/admin/api/branch/");
  }
  adminlogin(req){
    return this.service.post("http://"+this.ip+"/admin/api/adminlogin/",req)
  }

  studentlogin(req){
    return this.service.post("http://"+this.ip+"/admin/api/studentlogin/",req)
  }
  getStudentList(){
    return this.service.get("http://"+this.ip+"/admin/api/studentregister/")
  }

  studentById(req){
    return this.service.get("http://"+this.ip+"/admin/api/studentregister/"+req+"/")
  }

  createbranch(req){
    return this.service.post("http://"+this.ip+"/admin/api/branch/",req)
    
  }

  StudentEnrollement(req){
    return this.service.post("http://"+this.ip+"/admin/api/studentenroll/",req)
  }

  linkValidation(req){
    return this.service.get("http://"+this.ip+"/admin/api/studentenroll?student_link="+req)
  }

  sigunupLink(req,data){
    return this.service.put("http://"+this.ip+"/admin/api/studentregister/"+req+"/",data)
  }

  getbookingdetails(req){
    return this.service.get("http://"+this.ip+"/admin/api/timeslot/?from_date="+req.from_date+"&to_date="+req.to_date+"&from_time="+req.from_time+"&to_time="+req.to_time+"&branch_id="+req.branch_id+"&room_id="+req.room_id)
  }

  bookseats(req){
    return this.service.post("http://"+this.ip+"/admin/api/bookingseat/",req)
  }

}
