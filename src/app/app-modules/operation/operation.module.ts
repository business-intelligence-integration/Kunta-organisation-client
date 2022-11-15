import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { TontineComponent } from './tontine/tontine.component';
import { OperationsComponent } from './operations/operations.component';


@NgModule({
  declarations: [
    TontineComponent,
    OperationsComponent
  ],
  imports: [
    CommonModule,
    OperationRoutingModule
  ]
})
export class OperationModule { }
