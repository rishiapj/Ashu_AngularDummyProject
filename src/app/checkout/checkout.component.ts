import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
var cartapiurl = "https://apibyashu.herokuapp.com/api/cart"
var createorderapi= "https://apibyashu.herokuapp.com/api/addorder"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  phone=''
  name=""
  area=""
  city=""
  street=""
  totalprice=""
  pincode=""
  modeofpayment=""
  cartitems
  constructor(private currentroute:ActivatedRoute, private commonservice:CommonService,private http:HttpClient,private router:Router,private toastr:ToastrService) { 
    if(localStorage.email){
    if( commonservice.cartitems.length>0){
     this.cartitems=commonservice.cartitems
    }
    else{
      http.post(cartapiurl,{email:localStorage.email}).subscribe(
        (response)=>{
          if(response['code']=200){
            this.cartitems=response['cartitems']
            commonservice.cartitems=response['cartitems']
          }
        },
        (error)=>{
          console.log('error in getting product')
        }
        
      )
    }
    if(this.cartitems.length<=0){
      router.navigate(['/'])
      toastr.warning("your cart is empty")

    }
    if(localStorage.totalprice){
    this.totalprice=localStorage.totalprice}
    }
    else{
      router.navigate['/login']
      toastr.warning("you are not logged in")
      
    }
    

  }
  placeorder(){
    var requestob={
      
      items:this.cartitems,
      email:localStorage.email,
      name:this.name,
      phone:this.phone,
      area:this.area,
      city:this.city,
      street:this.street,
      pincode:this.pincode,
      totalprice:this.totalprice,
      modeofpayment:this.modeofpayment
    }
    console.log("request objeect for order" , requestob);
    this.http.post(createorderapi,requestob)
    .subscribe((response)=>{
      console.log("response from create order api" , response) 
      if(response["code"]==200){
       console.log("order placed");
       this.toastr.success(response["msg"])
       this.commonservice.cartitems=[]
       console.log(response)
       
       var url="/ordersucess/"+response["order"]['oid']
       this.router.navigate([url])
      }
      else{
        this.toastr.error(response['error'])
      }
    },
    (error)=>{
      this.toastr.error("Internal Server error")
      console.log("error from create order api" , error) 
    })
   }

  ngOnInit() {
  }

 
  }

