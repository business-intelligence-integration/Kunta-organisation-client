import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { TontineComponent } from './tontine/tontine.component';
import { OperationsComponent } from './operations/operations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMoreParticipantComponent } from './tontine/view-more-participant/view-more-participant.component';
import { ViewDetailsTontineComponent } from './tontine/view-details-tontine/view-details-tontine.component';
import { DetailCycleComponent } from './tontine/detail-cycle/detail-cycle.component';
import { DetailSessionOfTontineComponent } from './tontine/detail-session-of-tontine/detail-session-of-tontine.component';
import { Select2Module } from 'ng-select2-component';
import { AllPaymentOfSessionComponent } from './tontine/all-payment-of-session/all-payment-of-session.component';



@NgModule({
  declarations: [
    TontineComponent,
    OperationsComponent,
    ViewMoreParticipantComponent,
    ViewDetailsTontineComponent,
    DetailCycleComponent,
    DetailSessionOfTontineComponent,
    AllPaymentOfSessionComponent,
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module
  ]
})
export class OperationModule { }
