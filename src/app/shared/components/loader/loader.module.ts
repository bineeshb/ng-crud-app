import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BlockUIModule,
    ProgressSpinnerModule
  ]
})
export class LoaderModule { }
