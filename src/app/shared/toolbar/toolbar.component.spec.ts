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
      declarations: [ ToolbarComponent ],
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

  it('should visualize the user', () => {
    component.user = { uid: '123', auth: { displayName: 'Juri' } };
    fixture.detectChanges();

    let userElement = fixture.nativeElement.querySelector('.username');
    expect(userElement.innerHTML).toEqual('Juri');
  });

  it('should emit the login event', () => {
    const loginButton = fixture.nativeElement.querySelector('.btn-login');

    // we spy on the EventEmitter
    spyOn(component.login, 'emit');

    // provocate a click event
    loginButton.click();

    expect(component.login.emit).toHaveBeenCalled();
  });

});
