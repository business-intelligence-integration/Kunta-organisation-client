import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParameterRoutingModule } from './parameter-routing.module';
import { ParametersComponent } from './parameters/parameters.component';
import { TransversalityComponent } from './tontine/transversality/transversality.component';
import { FrequencyComponent } from './tontine/frequency/frequency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GainComponent } from './tontine/gain/gain.component';
import { CycleComponent } from './tontine/cycle/cycle.component';
import { SessionComponent } from './tontine/session/session.component';
import { StatusComponent } from './tontine/status/status.component';
import { PenalityTypeComponent } from './tontine/penality-type/penality-type.component';
import { PenaltyComponent } from './tontine/penalty/penalty.component';
import { PaymentStatusComponent } from './tontine/payment-status/payment-status.component';
import { PosteComponent } from './organisation/poste/poste.component';
import { PieceTypeComponent } from './organisation/piece-type/piece-type.component';
import { FamilySituationComponent } from './organisation/family-situation/family-situation.component';
import { CivilityComponent } from './organisation/civility/civility.component';
import { DraweeFormComponent } from './mutual-investment/drawee-form/drawee-form.component';
import { ProfitabilityTypeComponent } from './mutual-investment/profitability-type/profitability-type.component';
import { RefundTypeComponent } from './mutual-investment/refund-type/refund-type.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { RiskProfileComponent } from './mutual-investment/risk-profile/risk-profile.component';
import { SecurityDepositComponent } from './mutual-investment/security-deposit/security-deposit.component';
import { SubscriptionOfferComponent } from './mutual-investment/subscription-offer/subscription-offer.component';
import { UserTypeComponent } from './organisation/user-type/user-type.component';
import { UserCategoryComponent } from './organisation/user-category/user-category.component';
import { ViewPostMembersComponent } from './organisation/poste/view-post-members/view-post-members.component';


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
    DraweeFormComponent,
    ProfitabilityTypeComponent,
    RefundTypeComponent,
    RiskProfileComponent,
    SecurityDepositComponent,
    SubscriptionOfferComponent,
    UserTypeComponent,
    UserCategoryComponent,
    ViewPostMembersComponent,
  ],
  imports: [
    CommonModule,
    ParameterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ]
})
export class ParameterModule { }
