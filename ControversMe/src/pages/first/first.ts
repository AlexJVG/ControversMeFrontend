import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {HomePage1} from '../home/home.1';

import {Main} from '../mainpage/main';
import { Storage } from '@ionic/storage';
import { Headers, Http, RequestOptions } from '@angular/http';

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {
  }
  login(){
  	this.navCtrl.push(HomePage);
  }
  register(){
  	this.navCtrl.push(HomePage1);
  }

  anon(){
    this.storage.clear();
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      const requestOptions = new RequestOptions({ headers: headers});
      
      this.http.get("http://192.168.7.165:8080/api/rooms", requestOptions)
      .subscribe(data => {
        data._body = JSON.parse(data._body);
        console.log(data);
        if (data._body.success == true){
            this.storage.set('rooms', data._body);
            console.log(data._body);
            

          for (let room in data._body.data) {
            console.log(room);
            console.log(data._body.data[room]);
          }

        }
        }, error => {
        console.log(error);
      });
  
    
 
        
      
  	this.navCtrl.push(Main);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}
