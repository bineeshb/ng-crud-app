import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

import { MasterStoreComponent } from './master-store/master-store.component';
import { UserStoreComponent } from './user-store/user-store.component';
import { StoreComponent } from './store.component';

const routes: Routes = [{
  path: '',
  component: StoreComponent
}];

@NgModule({
  declarations: [
    MasterStoreComponent,
    UserStoreComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ButtonModule,
    DataViewModule,
    FieldsetModule,
    InputNumberModule,
    InputTextModule,
    RippleModule,
    TableModule
  ]
})
export class StoreModule { }
