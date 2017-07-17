import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarComponent } from './star.component';

@NgModule({
  imports: [ CommonModule],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarComponent
  ],
  declarations: [ StarComponent ],
})
export class SharedModule { }
