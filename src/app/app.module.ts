import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdInputModule, MdCardModule, MdButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDEGJFsl5v-gWI4YJJRWqH0A3kRKVKXBsc',
  authDomain: 'firestandups.firebaseapp.com',
  databaseURL: 'https://firestandups.firebaseio.com',
  storageBucket: 'firestandups.appspot.com',
  messagingSenderId: '433914487765'
};

// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Google,
//   method: AuthMethods.Redirect
// };

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, 'firestandups'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MaterialModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
