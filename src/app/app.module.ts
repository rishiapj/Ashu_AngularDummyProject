import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms"

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import {CommonService} from "./common.service"
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { CartComponent } from './cart/cart.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ForgotComponent } from './forgot/forgot.component';
import { DiscountPipe } from './discount.pipe';
import { HighlightDirective } from './highlight.directive';
import { CheckoutComponent } from './checkout/checkout.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CarouselComponent,
    ProductComponent,
    MainComponent,
    ListComponent,
    ProductdetailComponent,
    CartComponent,
    AddproductComponent,
    ForgotComponent,
    DiscountPipe,
    HighlightDirective,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CommonService],
  bootstrap: [MainComponent]
})
export class AppModule { }
