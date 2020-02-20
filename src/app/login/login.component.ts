import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = null
  password = null
  constructor(private router: Router,private http:HttpClient, private toastr :ToastrService) { 
     if(localStorage.email){
       this.router.navigate(['/'])
     }
  }

  login(){
    var user = {
      email:this.email,
      password:this.password
    }
    console.log("user" , user)
    var url ="https://apibyashu.herokuapp.com/api/login"
    this.http.post(url,user).subscribe((response)=>{
         if(response["token"]){
           this.router.navigate(['/'])
           localStorage.email = response["email"]
           localStorage.name = response["name"]
           this.toastr.success("Login Successful")
         }
         else{
           this.toastr.error("Invalid Login")
         }
    },(error)=>{

    })
  }

  ngOnInit() {
  }

}
