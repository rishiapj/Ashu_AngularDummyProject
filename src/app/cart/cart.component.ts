
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { CheckoutComponent } from '../checkout/checkout.component';


const cartproductsapiurl="https://apibyashu.herokuapp.com/api/cart"
const cartitemmodelapiurl="https://apibyashu.herokuapp.com/api/removefromcart"
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems=[]
  iscartempty=true
  totalprice=0


ngDoCheck(){
  this.totalprice=0
  this.cartitems && this.cartitems.length>0 && this.commonservice.cartitems.forEach((each)=>{
    console.log(each,">>>>>>>")
    this.totalprice=this.totalprice+each.product.price
  })
}


  constructor(private http:HttpClient,private toastr:ToastrService,private router:Router,private commonservice:CommonService) {
    if(localStorage.email){
if(commonservice.cartitems.length>0){
  console.log(">>>>>>>>>>> coming from common service" , commonservice.cartitems)
  this.cartitems=commonservice.cartitems
  this.iscartempty=false
  
}
 else{
   console.log("enetered into else");
       http.post(cartproductsapiurl,{email:localStorage.email}).subscribe(
      (response)=>{
        if(response["data"].length>0)
        {
        this.cartitems=response["data"]
        commonservice.cartitems=response['data']
        this.iscartempty=false
      }  
      else{
        this.iscartempty=true
        toastr.error(response['error'])
      }
      
       
      
      },
      (error)=>
      {
        toastr.error("error in cart")
      }
    )
   }
 }
   else{
     router.navigate(['/login'])
     toastr.warning("you are not logged in")
   }
  }

  ngOnInit() {
  }

remove(item){
 
  var requestob={email:localStorage.email,productid:item.productid}
  console.log("rrequest",requestob)
  this.http.post(cartitemmodelapiurl,requestob).subscribe(
 (response)=>{
   console.log(response)
      if(response['message']=="Removed  item from cart")
      {
        this.toastr.success("Cart Item Deleted")
        var index =this.commonservice.cartitems.indexOf(item)
        this.commonservice.cartitems.splice(index,1)
        if(this.commonservice.cartitems.length<=0){
          this.iscartempty=true
        }
        this.totalprice=this.totalprice-item.product.price
      }

    
    else
    {
      this.toastr.error(response['error'])
    }
    },
  (error)=>{
    this.toastr.error("Internal server error")  
  } )
}
checkout(){
localStorage.totalprice=this.totalprice
this.router.navigate(['/checkout'])
}
}
