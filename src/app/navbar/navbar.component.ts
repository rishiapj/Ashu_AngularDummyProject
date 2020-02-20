import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userloggedin
  constructor(private cs : CommonService) {
    if(localStorage.email){
      this.userloggedin = true
    }
   }

   logout(){
     this.userloggedin = false
     localStorage.clear()
   }

   ngDoCheck(){
    if(localStorage.email){
      this.userloggedin = true
    }
    else{
      this.userloggedin =false
    }
   }

  ngOnInit() {
  }

  changeImage(){
    this.cs.image = "../assets/images1.jpg"
  }

}
