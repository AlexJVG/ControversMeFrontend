import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions, ConnectionBackend, HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomePage1 } from '../pages/home/home.1';
import { FirstPage } from '../pages/first/first';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomePage1,
    FirstPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomePage1,
    FirstPage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
