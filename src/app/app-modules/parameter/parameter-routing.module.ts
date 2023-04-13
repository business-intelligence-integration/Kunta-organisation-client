import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { DraweeFormComponent } from './mutual-investment/drawee-form/drawee-form.component';
import { ProfitabilityTypeComponent } from './mutual-investment/profitability-type/profitability-type.component';
import { RefundTypeComponent } from './mutual-investment/refund-type/refund-type.component';
import { CivilityComponent } from './organisation/civility/civility.component';
import { FamilySituationComponent } from './organisation/family-situation/family-situation.component';
import { PieceTypeComponent } from './organisation/piece-type/piece-type.component';
import { PosteComponent } from './organisation/poste/poste.component';
import { ParametersComponent } from './parameters/parameters.component';
import { CycleComponent } from './tontine/cycle/cycle.component';
import { FrequencyComponent } from './tontine/frequency/frequency.component';
import { GainComponent } from './tontine/gain/gain.component';
import { PaymentStatusComponent } from './tontine/payment-status/payment-status.component';
import { PenalityTypeComponent } from './tontine/penality-type/penality-type.component';
import { PenaltyComponent } from './tontine/penalty/penalty.component';
import { SessionComponent } from './tontine/session/session.component';
import { StatusComponent } from './tontine/status/status.component';
import { TransversalityComponent } from './tontine/transversality/transversality.component';
import { RiskProfileComponent } from './mutual-investment/risk-profile/risk-profile.component';

const routes: Routes = [
  {path:"", component: ParametersComponent, canActivate: [EntityGuard],
  children: [
    {path:"", component: CivilityComponent, canActivate: [EntityGuard]},
    {path:"civility", component: CivilityComponent, canActivate: [EntityGuard]},
    {path:"family-situation", component: FamilySituationComponent, canActivate: [EntityGuard]},
    {path:"piece-type", component: PieceTypeComponent, canActivate: [EntityGuard]},
    {path:"postes", component: PosteComponent, canActivate: [EntityGuard]},
    {path:"cycles", component: CycleComponent, canActivate: [EntityGuard]},
    {path:"frequencies", component: FrequencyComponent, canActivate: [EntityGuard]},
    {path:"gains", component: GainComponent, canActivate: [EntityGuard]},
    {path:"payment-status", component: PaymentStatusComponent, canActivate: [EntityGuard]},
    {path:"penalty-type", component: PenalityTypeComponent, canActivate: [EntityGuard]},
    {path:"penalty", component: PenaltyComponent, canActivate: [EntityGuard]},
    {path:"session", component: SessionComponent, canActivate: [EntityGuard]},
    {path:"status", component: StatusComponent, canActivate: [EntityGuard]},
    {path:"transversality", component: TransversalityComponent, canActivate: [EntityGuard]},
    {path:"drawee-form", component: DraweeFormComponent, canActivate: [EntityGuard]},
    {path:"profitability-type", component: ProfitabilityTypeComponent, canActivate: [EntityGuard]},
    {path:"refund-type", component: RefundTypeComponent, canActivate: [EntityGuard]},
    {path:"risk-profile", component: RiskProfileComponent, canActivate: [EntityGuard]},

  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterRoutingModule { }
