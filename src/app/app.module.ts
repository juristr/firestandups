import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDEGJFsl5v-gWI4YJJRWqH0A3kRKVKXBsc',
  authDomain: 'firestandups.firebaseapp.com',
  databaseURL: 'https://firestandups.firebaseio.com',
  storageBucket: 'firestandups.appspot.com',
  messagingSenderId: '433914487765'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
