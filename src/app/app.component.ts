import { Component } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isEditMode = false;
  items: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;
  retrievedUsers: any[];
  userStandup: FirebaseListObservable<any[]>;
  auth: firebase.User;
  today = moment().format('YYYY-MM-DD');

  constructor(
    public af: AngularFireAuth,
    private db: AngularFireDatabase,
    private santizier: DomSanitizer
  ) {
    this.af.authState.subscribe(auth => {
      this.auth = auth;
      console.log('Auth', auth);

      this.users = this.db.list('/users');
      this.users.subscribe(data => {
        this.retrievedUsers = data;
        console.log('users', this.retrievedUsers);
      });

      // make sure the current user is being added to the list of all users
      this.users.update(this.auth.uid, {
        name: this.auth.displayName,
        email: this.auth.email,
        photoUrl: this.auth.photoURL
      });

      this.fetchData();
    });
  }

  onLogin() {
    this.af.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  onLogout() {
    console.log('calling logout');
    this.af.auth.signOut();
  }

  getProfilePicUrl(uid) {
    const user = this.retrievedUsers.find(x => x.$key === uid);
    return this.santizier.bypassSecurityTrustStyle(`url(${user.photoUrl}`);
  }

  fetchData() {
    this.items = this.db.list(`/testproject/standups/${this.today}`);

    // logging
    this.db.list('/testproject/standups').subscribe(data => {
      console.log(data);
    });
  }

  addStandupNotes() {
    this.isEditMode = true;
  }

  getList(key) {
    return this.db.list(`/testproject/standups/${key}`);
  }

  saveStandup(newStandup) {
    newStandup.user = {
      uid: this.auth.uid,
      name: this.auth.displayName
    };
    this.items.update(this.auth.uid, newStandup);

    this.isEditMode = false;
  }

  deleteEntry(entry) {
    const itemObservable = this.db.object(`/testproject/standups/${this.today}/${entry.$key}`);
    itemObservable.remove();
  }

  cancel() {
    this.isEditMode = false;
  }
}
