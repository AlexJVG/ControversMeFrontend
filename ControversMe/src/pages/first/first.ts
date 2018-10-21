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
      
      this.http.get("http://192.168.10.14:8080/api/rooms", requestOptions)
        .subscribe((data: any) => {
        data._body = JSON.parse(data._body);
        console.log(data);
        if (data._body.success == true){
            this.storage.set('rooms', data._body);
            this.storage.set('token',"c1e617e95904e808e608c890821f68cbd951c0ebed1cf323a556debb52664f613df0234726d3f30557f80fe6de4c657a9309cb47963ce9c9d2f9d35cd98fcf0da9b911bdbe513560aed9148bb3d2dac58ef2e7f756ca2635c4bf71dc946605ae");
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
