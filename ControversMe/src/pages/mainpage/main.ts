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
export class Main {
  room: any;  
  lists: any[] = [];  
  ids: any[] = [];  
  rooms: any;
  cred = {name: ''};
  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, private storage: Storage, private alertCtrl: AlertController) {
  
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
  add(){
    this.showPrompt();
    //this.navCtrl.push(MainRedirect);    
  }
  showPrompt() {
    this.storage.get('token').then((val) => {
      console.log(val);
      

    if(val == null){
      this.presentToast("You cannot create if you are Anonymous");
    }else{
    
    let prompt = this.alertCtrl.create({
      title: 'Create-a-Conversation',
      message: "Enter the name of the Conversation!",
      inputs: [
        {
          name: 'title',
          placeholder: 'Name',
        }
      
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log(data.title);
            console.log(val);
            this.sendPostRequest(val, data.title);

            //Send To Server!
          }
        }
      ]
    });
    prompt.present();

  }
});
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
sendPostRequest(val, data) {
  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );
  const requestOptions = new RequestOptions({ headers: headers});

  let postData = {
          "token": val,
          "name": data
          
  }

  
    this.http.post("http://192.168.10.14:8080/api/create-room",postData, requestOptions)
    .subscribe(data => {
      console.log(data);
     
      }, error => {
      console.log(error);
    });
    this.http.get("http://192.168.10.14:8080/api/rooms", requestOptions)
    .subscribe((data: any) => {
      data._body = JSON.parse(data._body);
      console.log(data);
      if (data._body.success == true){
          this.storage.set('rooms', data._body);
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  
          //console.log(data._body);
          
      }else{
          this.presentToast(data._body.error);
      }
      }, error => {
      console.log(error);
    });

  }
  logout(){
    this.storage.clear();
    this.navCtrl.push(FirstPage);    
    
  }
}
