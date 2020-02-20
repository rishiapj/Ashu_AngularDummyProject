import {Component} from "@angular/core"
import {HttpClient} from "@angular/common/http"




@Component({
   selector:'app-signup',
   templateUrl:'./signup.component.html',
   styleUrls:[]
})
export class SignupComponent{
    constructor(private http :HttpClient){

    }

name = null
email = null
password = null

signup(){
    var user = {
        email:this.email,
        name : this.name,
        password: this.password
    }  //json
    console.log(">>>>>>>>>>>>>>>>>." , user)
    var url = "https://apibyashu.herokuapp.com/api/register"
    this.http.post(url,user).subscribe((response)=>{
        console.log("response from register api", response)
    },(error)=>{})
   
}
    

}