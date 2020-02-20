import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products
  constructor(private http:HttpClient) {
    var url = "https://apibyashu.herokuapp.com/api/allproducts"
    this.http.get(url).subscribe((response)=>{
      this.products = response["data"]
    })
   }

  ngOnInit() {
  }

}
