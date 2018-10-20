import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage1 } from '../home/home.1';

@Component({
  selector: 'page-home',
  templateUrl: 'main.html'
})
export class MainRedirect {
  cred = { username: '', password: ''};  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
 
  }
  signIn(){
    if (this.cred.username != ""){
      if (this.cred.password != ""){
      
      }else{
        this.presentToast("No Password");        
      }
    }else{
      this.presentToast("No Username");      
    }
  }
  register() {
    this.navCtrl.push(HomePage1);
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
