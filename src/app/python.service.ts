import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PythonService {
  branchcrt(obj: { "branchName": any; "address": any; "created_Date": Date; "flage": boolean; }) {
    throw new Error("Method not implemented.");
  }

  constructor(private service:HttpClient) { }
  getBranchList(){
    return this.service.get("http://127.0.0.1:8000/admin/api/branch/");
  }
  adminlogin(req){
    return this.service.post("http:////127.0.0.1:8000/admin/api/adminlogin/",req)
  }

  studentlogin(req){
    return this.service.post("http://127.0.0.1:8000/admin/api/studentlogin/",req)
  }
  getStudentList(){
    return this.service.get("http://127.0.0.1:8000/admin/api/studentregister/")
  }

  createbranch(req){
    return this.service.post("http://127.0.0.1:8000/admin/api/branch/",req)
    
  }
}
