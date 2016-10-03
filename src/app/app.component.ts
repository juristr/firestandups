import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  userStandup: FirebaseListObservable<any[]>;
  auth:FirebaseAuthState;
  today = moment().format('YYYY-MM-DD');

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      this.auth = auth;
      console.log('Auth', auth);

      this.fetchData();
    });
  }

  login() {
    this.af.auth.login();
  }

  fetchData() {
    this.items = this.af.database.list('/testproject/standups');

    this.af.database.list(`/testproject/standups/${this.today}`, {
      query: {
        uid: this.auth.uid
      }
    }).subscribe(data => {
      this.userStandup = data[0];
    });

    // logging
    this.af.database.list('/testproject/standups')
      .subscribe((data) => {
        console.log(data);
      });
  }

  getList(key) {
    return this.af.database.list(`/testproject/standups/${key}`);
  }

  saveStandup(newStandup) {
    // this.af.database

    newStandup.uid = this.auth.uid;

    this.items.push(newStandup);
  }

  logout() {
     this.af.auth.logout();
  }

}
