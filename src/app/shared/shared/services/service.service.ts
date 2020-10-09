import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  adminlogin() {
    throw new Error("Method not implemented.");
  }
  getBranchLists() {
    throw new Error("Method not implemented.");
  }

  constructor(private http:HttpClient) { }

  getstudentList(){
    return this.http.get("http://localhost:3000/students")
  }

  branchcrt(e){
    return this.http.post("http://localhost:3000/branchList",e)
  }

  getbranchdata(){
    return this.http.get("http://localhost:3000/branchList");
  }

  logindatafun(){
    return this.http.get("http://localhost:3000/loginDetails");
  }

  databyid(e){
    return this.http.get("http://localhost:3000/students"+e)
  }
}

