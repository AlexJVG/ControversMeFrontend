import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import {Socket} from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'main.html'
})
export class MainRedirect {
    messages = [];
    nickname = 'testuser';
    message = '';
    room: any;
    token: any;
  constructor(public navCtrl: NavController, public http: Http, private socket: Socket,private storage: Storage,private toastCtrl: ToastController) {
    this.socket.connect();
    this.storage.get('currentChatRoom').then((val) => {
      
      this.room = val;
      
      let postDataOne = {
        room: this.room,
      };
      var headersOne = new Headers();
      headersOne.append("Accept", 'application/json');
      headersOne.append('Content-Type', 'application/json' );
      const requestOptionsOne = new RequestOptions({ headers: headersOne});
      
      
      
      this.http.post("http://192.168.7.165:8080/api/rooms/get-room-info",postDataOne,requestOptionsOne).subscribe(data => {
        data._body = JSON.parse(data._body);
        console.log(data);
        if (data._body.success == true){

           console.log(data._body.debaters);

        }
        }, error => {
        console.log(error);
      });

      this.storage.get('token').then((each) =>{
        this.token = each;
      let postData = {
        room: this.room,
        token: this.token
      };
      var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        const requestOptions = new RequestOptions({ headers: headers});
      this.http.post("http://192.168.7.165:8080/api/get-old-chats",postData,requestOptions).subscribe(data => {
          data._body = JSON.parse(data._body);
          console.log(data);
          if (data._body.success == true){

              this.messages = [].concat(data._body.data, this.messages);
          }
          }, error => {
          console.log(error);
        });
        this.socket.emit('join-room', {
      room: this.room,
      nickname: this.nickname,
      token: this.token
    });
    });
    });
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
 
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }



  sendMessage() {
    this.socket.emit('add-message', { text: this.message,token:this.token,room: this.room,nickname: this.nickname });
    this.message = '';
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('new-live-message', (data) => {
        console.log(data)
        observer.next(data);
      });
    })
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.emit('leave-room');
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
