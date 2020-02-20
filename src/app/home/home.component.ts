import { Component, OnInit } from '@angular/core';
import {data} from "./data"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:string
  products = data
  constructor() { }

  ngOnInit() {
  }

}
