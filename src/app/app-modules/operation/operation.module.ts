import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { TontineComponent } from './tontine/tontine.component';
import { OperationsComponent } from './operations/operations.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { TransversalityComponent } from './transversality/transversality.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TontineComponent,
    OperationsComponent,
    FrequencyComponent,
    TransversalityComponent
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OperationModule { }
