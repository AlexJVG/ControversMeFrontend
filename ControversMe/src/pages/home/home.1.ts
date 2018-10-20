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

    cred = {firstname: '', lastname: '', email: '',username: '', password: '', repassword: '' };
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
                                    //Check if strong password
                                    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
                                    if (mediumRegex.test(this.cred.password)) {
                                        //good password
                                        this.sendPostRequest();
                                        //DO STUFF WITH PASSWORD
                                        this.navCtrl.push(Main);                            
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
                "last_name": "Customer004",
                "first_name": "Customer004",
                "email": "customer004@email.com",
                "bio": "0000252525",
                "password": "0000252525"
                
        }
    
        this.http.post("http://192.168.7.165:8080/api/create-account", postData, requestOptions)
          .subscribe(data => {
            console.log(data['_body']);
           }, error => {
            console.log(error);
          });
        }
}
