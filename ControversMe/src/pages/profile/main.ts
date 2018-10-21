import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage1 } from '../home/home.1';
import { MainRedirect } from '../redirect/main';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular'; //untuk alert
import { FirstPage } from '../first/first';

@Component({
  selector: 'page-home',
  templateUrl: 'main.html'
})
export class Profile {
  room: any;  
  lists: any[] = [];  
  ids: any[] = [];  
  rooms: any;
  cred = {name: ''};
  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, private storage: Storage, private alertCtrl: AlertController) {
  

  }
  
}
