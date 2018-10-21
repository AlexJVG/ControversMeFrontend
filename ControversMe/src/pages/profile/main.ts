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
  First: string = '';
  Last: string = '';
  Email: string = '';
  Username: string = '';
  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, private storage: Storage, private alertCtrl: AlertController) {
    storage.get('token').then((val) => {
      storage.get('email').then((val1) => {
      let postData = {
        "token": val,
        "email": val1
        
      }
      
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      const requestOptions = new RequestOptions({ headers: headers});
  
  
      this.http.post("http://192.168.10.14:8080/api/get-user-data",postData, requestOptions)
      .subscribe((data: any) => {
      data._body = JSON.parse(data._body);
      console.log(data);
      if (data._body.success == true){
  
          
        this.First= data._body.data.first_name;
        this.Last = data._body.data.last_name;
        this.Username= data._body.data.username;
        this.Email = data._body.data.email;

      
  
      }
      }, error => {
      console.log(error);
    });
    });
  });
  

  }
  
}
