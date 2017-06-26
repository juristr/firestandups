/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        MaterialModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user is logged in', () => {

    beforeEach(() => {
      component.user = { uid: '123', auth: { displayName: 'Juri' } };
      fixture.detectChanges();
    });

    it('should visualize the user', () => {
      let userElement = fixture.nativeElement.querySelector('.username');
      expect(userElement.innerHTML).toEqual('Juri');
    });

    it('should emit the logout event', () => {
      // const logoutButton = fixture.nativeElement.querySelector('.btn-logout');

      // we spy on the EventEmitter
      spyOn(component.logout, 'emit');

      // provocate a click event
      // logoutButton.click();
      component.doLogout();

      expect(component.logout.emit).toHaveBeenCalled();
    });

  });

  describe('No user logged in', () => {
    it('should emit the login event', () => {
      const loginButton = fixture.nativeElement.querySelector('.btn-login');

      // we spy on the EventEmitter
      spyOn(component.login, 'emit');

      // provocate a click event
      loginButton.click();

      expect(component.login.emit).toHaveBeenCalled();
    });
  });



});
