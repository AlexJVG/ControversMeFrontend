import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage1 } from '../home/home.1';
import { MainRedirect } from '../redirect/main';

@Component({
  selector: 'page-home',
  templateUrl: 'main.html'
})
export class Main {
  cred = { username: '', password: ''};  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
 
  }
  buttonClick(){
    this.navCtrl.push(MainRedirect);    
  }
}
