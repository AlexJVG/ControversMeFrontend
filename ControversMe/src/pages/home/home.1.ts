import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Keyboard} from 'ionic-angular';
import { App, Platform} from 'ionic-angular';
import { Main } from '../mainpage/main';

@Component({
    selector: 'page-home',
    templateUrl: 'home.1.html'
})

export class HomePage1 {

    cred = {firstname: '', lastname: '', email: '',username: '', password: '', repassword: '' , bio: ''};
    constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, platform: Platform) {

    }
    signIn() {
        this.navCtrl.push(HomePage);
    }
    register() {
        if(this.cred.firstname != ""){
            if(this.cred.lastname !=""){
                if(this.cred.email !=""){
                    if (this.cred.username != "") {
                        if (this.cred.password != "") {
                            if (this.cred.repassword != "") {
                                if (this.cred.repassword == this.cred.password) {
                                    if(this.cred.bio == ""){
                                        this.cred.bio = "Ready to debate";
                                    }
                                    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
                                    if (mediumRegex.test(this.cred.password)) {
                                        //good password
                                        this.sendPostRequest();
                                    } else {
                                        this.presentToast("Your Password is not strong enough");
                                    }
                                } else {
                                    this.presentToast("Passwords Don't Match");
                                }
                            } else {
                                this.presentToast("No Re-Typed Password");
                            }

                        } else {
                            this.presentToast("No Password");
                        }
                    } else {
                        this.presentToast("No Username");
                    }
                }
                else{
                    this.presentToast("No Email");
                }
            }else{
                this.presentToast("No Last Name");
            }

        }else{
            this.presentToast("No First Name");
        }
    }
    presentToast(text: string) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }
    sendPostRequest() {
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        const requestOptions = new RequestOptions({ headers: headers });
    
        let postData = {
                "username": this.cred.username,
                "last_name": this.cred.lastname,
                "first_name": this.cred.firstname,
                "email": this.cred.email,
                "bio": this.cred.bio,
                "password": this.cred.password
                
        }
    
        this.http.post("http://73.202.191.228:8080/api/create-account", postData, requestOptions)
          .subscribe(data => {
            console.log(data);
            
            if (JSON.parse(data._body).success == true){
                this.presentToast("Account Created");                
                this.navCtrl.push(HomePage);
                

            }else{
                this.presentToast(JSON.parse(data._body).error);
            }
            }, error => {
            console.log(error);
          });
        }
}
