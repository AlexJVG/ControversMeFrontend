import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage1 } from '../home/home.1';
import { MainRedirect } from '../redirect/main';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'main.html'
})
export class Main {
  room: any;  
  lists: any[] = [];  
  ids: any[] = [];  
  rooms: any;
  cred = { username: '', password: ''};  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, private storage: Storage) {
   
    storage.get('rooms').then((val) => {
      this.rooms = val.data;
      for (let room in this.rooms) {
        let id = room;
        let contents = this.rooms[id];
        this.ids.push(id);
        this.lists.push({
          id: id,
          name: contents.name
        });
        
      }
      console.log(this.lists);
            
    });
  }
  buttonClick(index){
    console.log(index);
    this.storage.set('currentChatRoom', index);    
    this.storage.set('chatroom', this.ids);
    this.navCtrl.push(MainRedirect);    
  }
}
