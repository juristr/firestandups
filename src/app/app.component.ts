import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  auth:FirebaseAuthState;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      this.auth = auth;

      this.fetchData();
    });
  }

  login() {
    this.af.auth.login();
  }

  fetchData() {
    this.items = this.af.database.list('/testproject');
    this.af.database.list('/testproject')
      .subscribe((data) => {
        console.log(data);
      });
  }

  logout() {
     this.af.auth.logout();
  }

}
