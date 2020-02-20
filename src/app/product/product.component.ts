import { Component, OnInit ,Input } from '@angular/core';
import { CommonService } from '../common.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() name
  @Input() price
  @Input() product

  showProduct(){
    var url = "/product/"+this.product.productid
    this.router.navigate([url])
  }
  
  constructor(private router : Router,private cs1 : CommonService) { }


  ngOnInit() {
  }

}
