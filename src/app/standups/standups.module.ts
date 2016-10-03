import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandupsComponent } from './standups.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    StandupsComponent
  ],
  declarations: [StandupsComponent]
})
export class StandupsModule { }
