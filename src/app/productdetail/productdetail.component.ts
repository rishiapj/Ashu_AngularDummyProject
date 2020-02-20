import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {Router } from "@angular/router"
import { CommonService } from '../common.service';

//var addtocartapiurl="http://localhost:7000/api/addtocart"
var addtocartapiurl="https://apibyashu.herokuapp.com/api/addtocart"
//var cartitemsapiurl="http://localhost:7000/api/cartitems"
var cartitemsapiurl="https://apibyashu.herokuapp.com/api/cart"
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetail.component.html'
})



export class ProductdetailComponent implements OnInit {
product={
  name:null,
  image:null,
  price:null
}
productalreadyincart=false

  constructor(private http:HttpClient,private currentroute:ActivatedRoute,private toastr:ToastrService,private router:Router,private commonservice:CommonService) { 
    console.log("current route ki details" , this.currentroute.snapshot)
    var productid = this.currentroute.snapshot.params.pid;
var apiurl = "https://apibyashu.herokuapp.com/api/product/"+ productid
http.get(apiurl).subscribe(
  (response)=>{
      console.log(response["data"])
      this.product=response["data"]
      if(commonservice.cartitems.length>0){
        commonservice.cartitems.forEach((each) => {
          console.log(each.pid)
          if(each.productid==this.product["productid"]){
            this.productalreadyincart=true
          }
        });
      }
      else{
        http.post(cartitemsapiurl,{email:localStorage.email}).subscribe(
          (response)=>{
              response["data"].forEach((each)=>{
                if(each.productid==this.product["productid"]){
                  this.productalreadyincart=true
                }
              })
          },
          (error)=>{
            console.log("error",error)
          }
        )
      }
  },
  (error)=>{
    console.log("error in showing product",error)
    toastr.error("error in showing product")
  }
)
   }
  ngOnInit() {
  }
 addtocart(movetocart?){
   this.productalreadyincart=true
   if(localStorage.email){
    var cart={
   email:localStorage.email,
   productid:this.product["productid"],
   product:{
     name:this.product["name"],
   image:this.product['image'],
  price:this.product["price"],
 
   }
  }

   this.http.post(addtocartapiurl,cart).subscribe((response)=>{
     if(response['message']=="Added to cart"){
       this.toastr.success("Added to cart")
      
       this.commonservice.cartitems.push(response["data"])
       if(movetocart){
         this.router.navigate(['/cart'])
       }

     }
     else{
       this.toastr.error("Error in adding",response['error'])
     }

   },
   (error)=>{
     this.toastr.error("error in adding to add cart")
   })
   
   
  }
  else{
    this.router.navigate(["/login"])
  }
 }
buynow(){
  if(localStorage.email){
    if(!this.productalreadyincart){
  this.addtocart(true)
 
  
}
else{
  this.router.navigate(['/cart'])
}

  }
  else{
    this.router.navigate(['/login'])
  }
}

}

