import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { TontineComponent } from './tontine/tontine.component';
import { OperationsComponent } from './operations/operations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMoreParticipantComponent } from './tontine/view-more-participant/view-more-participant.component';
import { ViewDetailsTontineComponent } from './tontine/view-details-tontine/view-details-tontine.component';


@NgModule({
  declarations: [
    TontineComponent,
    OperationsComponent,
    ViewMoreParticipantComponent,
    ViewDetailsTontineComponent,
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OperationModule { }
