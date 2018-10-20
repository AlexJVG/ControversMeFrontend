import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  login(){
  		this.navCtrl.push(HomePage);
  }
  anon(){
  	this.navCtrl.push();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}
