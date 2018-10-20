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

    cred = { username: '', password: '', repassword: '' };
    constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, platform: Platform) {

    }
    signIn() {
        this.navCtrl.push(HomePage);
    }
    register() {
        if (this.cred.username != "") {
            if (this.cred.password != "") {
                if (this.cred.repassword != "") {
                    if (this.cred.repassword == this.cred.password) {
                        //Check if strong password
                        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
                        if (mediumRegex.test(this.cred.password)) {
                            //good password

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
}