import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import {Socket} from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'main.html'
})
export class MainRedirect {
  nickname = '';
  room: any;
  constructor(public navCtrl: NavController, public http: Http, private socket: Socket) {
  }
  joinChat(){
    this.socket.connect();
    this.socket.emit('set-nickname',this.nickname);
    //this.navCtrl.push
  }
}
