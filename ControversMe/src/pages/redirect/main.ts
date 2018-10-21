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
    message = '';
    room: any;
    token: any;
    number: any;
    messageOrNah: any;
    username: any;
    debaters: any[] = [];
    debaterOne: any;
    debaterTwo: any;
    
  constructor(public navCtrl: NavController, public http: Http, private socket: Socket,private storage: Storage,private toastCtrl: ToastController) {
    this.socket.connect();
    this.storage.get('currentChatRoom').then((val) => {
      
      this.room = val;

      this.storage.get('token').then((each) =>{
        this.token = each;
         let postDataOne = {
        room: this.room,
        token: this.token
      };
      var headersOne = new Headers();
      headersOne.append("Accept", 'application/json');
      headersOne.append('Content-Type', 'application/json' );
      const requestOptionsOne = new RequestOptions({ headers: headersOne});
      
      this.messageOrNah = false;
      
      
      
      this.http.post("http://73.202.191.228:8080/api/get-room-info",postDataOne,requestOptionsOne).subscribe(data => {
        data._body = JSON.parse(data._body);
        console.log(data);
        if (data._body.success == true){
          this.debaters = data._body.data.debaters;
          this.http.post("http://73.202.191.228:8080/api/get-user-data",{token: this.token,},requestOptionsOne).subscribe(data => {
            data._body = JSON.parse(data._body);
            console.log(data);
            if (data._body.success == true){
              console.log("in");
              console.log("2.0");            
              console.log(this.debaters);
              this.username = data._body.data.username;
              let one = 0; 
              for (let debater in this.debaters) { 
                console.log(debater);
                if (one == 0){
                this.debaterOne = debater;
                console.log(this.debaterOne);            
                
                }else{
                this.debaterTwo = debater;
                console.log(this.debaterTwo);            
                
                }
                one = one + 1;                
                console.log(this.username);            
                
               if (debater == this.username){
                console.log("2.0");            
                
                this.messageOrNah = true;
    
               }
               console.log(this.messageOrNah);            
               
              }
            }
            }, error => {
            console.log(error);
          }); 
           console.log(data._body.data.debaters);
           console.log(Object.keys(data._body.data.debaters).length);
           this.number = Object.keys(data._body.data.debaters).length; 
           
         
           //console.log(this.messageOrNah);            
           
          }
           
           

        
        }, error => {
        console.log(error);
      });
      let postData = {
        room: this.room,
        token: this.token
      };
      var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        const requestOptions = new RequestOptions({ headers: headers});
      this.http.post("http://73.202.191.228:8080/api/get-old-chats",postData,requestOptions).subscribe(data => {
          data._body = JSON.parse(data._body);
          console.log(data._body.data.debaters);
          if (data._body.success == true){

              this.messages = [].concat(data._body.data, this.messages);
          }
          }, error => {
          console.log(error);
        });
        this.socket.emit('join-room', {
      room: this.room,
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
        console.log('User left: ' + user);
      } else {
        console.log('User joined: ' + user);
      }
    });
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message,token:this.token,room: this.room });
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
  one(){
    let post = {
      room: this.room,
      token: this.token,
      toVoteFor: this.debaterOne
    };
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers});
 
    this.http.post("http://73.202.191.228:8080/api/vote-for-person", post, requestOptions)
    .subscribe(data => {
      console.log(data);
      if (JSON.parse(data._body).success == true){
          
      }else{
          //this.presentToast(JSON.parse(data._body).error);
      }
      }, error => {
      console.log(error);
    });

    
  }
  
  two(){
    let post = {
      room: this.room,
      token: this.token,
      toVoteFor: this.debaterTwo
    };
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers});

    this.http.post("http://73.202.191.228:8080/api/vote-for-person", post, requestOptions)
    .subscribe(data => {
      console.log(data);
      if (JSON.parse(data._body).success == true){
          
      }else{
          //this.presentToast(JSON.parse(data._body).error);
      }
      }, error => {
      console.log(error);
    });

    
  
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
    this.socket.emit('leave-room',{room: this.room,token: this.token});
  }
}
