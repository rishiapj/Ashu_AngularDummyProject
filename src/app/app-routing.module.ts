import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CartComponent } from './cart/cart.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'cart',component:CartComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'admin',loadChildren:'./admin/admin.module#AdminModule'},
  
  
  {path:'product/:pid',component:ProductdetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
