import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() user: any;

  @Output() login: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  doLogout() {
    this.logout.emit();
  }

}
