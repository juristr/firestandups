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

      this.af.database.list('/users')
        .update(this.auth.uid, {
          name: this.auth.auth.displayName,
          email: this.auth.auth.email,
          photoUrl: this.auth.auth.photoURL
        });

      this.fetchData();
    });
  }

  login() {
    this.af.auth.login();
  }

  fetchData() {
    this.items = this.af.database.list(`/testproject/standups/${this.today}`);

    console.debug('fetching data with for ', this.today);

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
    const newObj = {};
    newObj[this.auth.uid] = newStandup;

    this.items.update(this.today, newObj);
  }

  logout() {
     this.af.auth.logout();
  }

}
