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
import { ViewMoreDetailsSessionComponent } from './tontine/view-more-details-session/view-more-details-session.component';
import { AllPenalityOfSessionComponent } from './tontine/all-penality-of-session/all-penality-of-session.component';
import { MutualInvestmentComponent } from './mutual-investment/mutual-investment.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ViewMoreSecurityDepositComponent } from './mutual-investment/view-more-security-deposit/view-more-security-deposit.component';
import { ViewMoreSubscriptionOfferComponent } from './mutual-investment/view-more-subscription-offer/view-more-subscription-offer.component';
import { ViewDetailSubscriptionComponent } from './mutual-investment/view-detail-subscription/view-detail-subscription.component';
import { ViewDetailPaymentComponent } from './mutual-investment/view-detail-payment/view-detail-payment.component';
import { ViewDetailMutualInvestmentComponent } from './mutual-investment/view-detail-mutual-investment/view-detail-mutual-investment.component';



@NgModule({
  declarations: [
    TontineComponent,
    OperationsComponent,
    ViewMoreParticipantComponent,
    ViewDetailsTontineComponent,
    DetailCycleComponent,
    DetailSessionOfTontineComponent,
    AllPaymentOfSessionComponent,
    ViewMoreDetailsSessionComponent,
    AllPenalityOfSessionComponent,
    MutualInvestmentComponent,
    ViewMoreSecurityDepositComponent,
    ViewMoreSubscriptionOfferComponent,
    ViewDetailSubscriptionComponent,
    ViewDetailPaymentComponent,
    ViewDetailMutualInvestmentComponent,
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    TooltipModule
  ]
})
export class OperationModule { }
