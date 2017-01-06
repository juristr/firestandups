import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import * as moment from 'moment';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isEditMode: boolean = false;
  items: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;
  retrievedUsers: any[];
  userStandup: FirebaseListObservable<any[]>;
  auth: FirebaseAuthState;
  today = moment().format('YYYY-MM-DD');

  constructor(public af: AngularFire, private santizier: DomSanitizer) {
    this.af.auth.subscribe(auth => {
      this.auth = auth;
      console.log('Auth', auth);

      this.users = this.af.database.list('/users');
      this.users.subscribe((data) => {
        this.retrievedUsers = data;
        console.log('users', this.retrievedUsers);
      });

      // make sure the current user is being added to the list of all users
      this.users
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

  getProfilePicUrl(uid) {
    const user = this.retrievedUsers.find(x => x.$key === uid);
    return this.santizier.bypassSecurityTrustStyle(`url(${user.photoUrl}`);
  }

  logout() {
    console.log('calling logout');
    this.af.auth.logout();
  }

  fetchData() {
    this.items = this.af.database.list(`/testproject/standups/${this.today}`);

    // logging
    this.af.database.list('/testproject/standups')
      .subscribe((data) => {
        console.log(data);
      });
  }

  addStandupNotes() {
    this.isEditMode = true;
  }

  getList(key) {
    return this.af.database.list(`/testproject/standups/${key}`);
  }

  saveStandup(newStandup) {
    newStandup.user = {
      uid: this.auth.uid,
      name: this.auth.auth.displayName
    };
    this.items.update(this.auth.uid, newStandup);

    this.isEditMode = false;
  }

  deleteEntry(entry) {
    const itemObservable = this.af.database.object(`/testproject/standups/${this.today}/${entry.$key}`);
    itemObservable.remove();
  }

  cancel() {
    this.isEditMode = false;
  }

}
