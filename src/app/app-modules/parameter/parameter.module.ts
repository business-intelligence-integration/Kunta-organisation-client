import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParameterRoutingModule } from './parameter-routing.module';
import { ParametersComponent } from './parameters/parameters.component';
import { TransversalityComponent } from './transversality/transversality.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GainComponent } from './gain/gain.component';
import { CycleComponent } from './cycle/cycle.component';
import { SessionComponent } from './session/session.component';
import { StatusComponent } from './status/status.component';
import { PenalityTypeComponent } from './penality-type/penality-type.component';
import { PenaltyComponent } from './penalty/penalty.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { PosteComponent } from './organisation/poste/poste.component';
import { PieceTypeComponent } from './piece-type/piece-type.component';
import { FamilySituationComponent } from './family-situation/family-situation.component';
import { CivilityComponent } from './civility/civility.component';


@NgModule({
  declarations: [
    ParametersComponent,
    TransversalityComponent,
    FrequencyComponent,
    GainComponent,
    CycleComponent,
    SessionComponent,
    StatusComponent,
    PenalityTypeComponent,
    PenaltyComponent,
    PaymentStatusComponent,
    PosteComponent,
    PieceTypeComponent,
    FamilySituationComponent,
    CivilityComponent,
  ],
  imports: [
    CommonModule,
    ParameterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ParameterModule { }
