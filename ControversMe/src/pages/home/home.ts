import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage1 } from '../home/home.1';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cred = { username: '', password: ''};  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
 
  }
  signIn(){
    if (this.cred.username != ""){
      if (this.cred.password != ""){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        var works = false;
        var link = 'http://www.com/login.php';
        this.http.post(link, { username: this.cred.username, password: this.cred.password }, options).subscribe(data => {
            console.log(data['_body']);
            works = data['proceed'];
        }, error => {
            console.log(error);// Error getting the data
        });
        if (works) {
            //Go to main page
        }
      }else{
        this.presentToast("No Password");        
      }
    }else{
      this.presentToast("No Username");      
    }
  }
  register() {
    this.navCtrl.push(HomePage1);
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
}
