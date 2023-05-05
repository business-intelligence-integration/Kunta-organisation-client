import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from '../core/services/entity.guard';
import { AppContentComponent } from './app-content/app-content.component';
import { ViewMoreAreClubComponent } from './organisation/area/view-more-are-club/view-more-are-club.component';
import { ViewMoreAreaComponent } from './organisation/main-office/centers/view-more-area/view-more-area.component';
import { ViewMoreComponent } from './organisation/club/view-more/view-more.component';
import { CentersComponent } from './organisation/main-office/centers/centers.component';
import { ViewMorePostComponent } from './organisation/main-office/view-more-post/view-more-post.component';
import { SponsoresComponent } from './organisation/user/sponsores/sponsores.component';
import { ViewMoreParticipantComponent } from './operation/tontine/view-more-participant/view-more-participant.component';
import { ViewDetailsTontineComponent } from './operation/tontine/view-details-tontine/view-details-tontine.component';
import { CycleComponent } from './parameter/tontine/cycle/cycle.component';
import { SessionComponent } from './parameter/tontine/session/session.component';
import { DetailCycleComponent } from './operation/tontine/detail-cycle/detail-cycle.component';
import { DetailSessionOfTontineComponent } from './operation/tontine/detail-session-of-tontine/detail-session-of-tontine.component';
import { StatusComponent } from './parameter/tontine/status/status.component';
import { AllPaymentOfSessionComponent } from './operation/tontine/all-payment-of-session/all-payment-of-session.component';
import { PenalityTypeComponent } from './parameter/tontine/penality-type/penality-type.component';
import { PenaltyComponent } from './parameter/tontine/penalty/penalty.component';
import { PaymentStatus } from '../core/classes/PaymentStatus';
import { ViewMoreDetailsSessionComponent } from './operation/tontine/view-more-details-session/view-more-details-session.component';
import { PosteComponent } from './parameter/organisation/poste/poste.component';
import { PieceTypeComponent } from './parameter/organisation/piece-type/piece-type.component';
import { FamilySituationComponent } from './parameter/organisation/family-situation/family-situation.component';
import { CivilityComponent } from './parameter/organisation/civility/civility.component';
import { AllPenalityOfSessionComponent } from './operation/tontine/all-penality-of-session/all-penality-of-session.component';
import { UserDetailsRoleComponent } from './organisation/user/user-details-role/user-details-role.component';
import { ViewMoreSecurityDepositComponent } from './operation/mutual-investment/view-more-security-deposit/view-more-security-deposit.component';
import { ViewMoreSubscriptionOfferComponent } from './operation/mutual-investment/view-more-subscription-offer/view-more-subscription-offer.component';
import { ViewDetailSubscriptionComponent } from './operation/mutual-investment/view-detail-subscription/view-detail-subscription.component';
import { ViewDetailPaymentComponent } from './operation/mutual-investment/view-detail-payment/view-detail-payment.component';
import { ViewDetailMutualInvestmentComponent } from './operation/mutual-investment/view-detail-mutual-investment/view-detail-mutual-investment.component';

const routes: Routes = [
  {
    path:"", component: AppContentComponent,
    children: [
      {
        path:"user-details-role", component: UserDetailsRoleComponent, canActivate: [EntityGuard]
      },
     
      {
        path:"all-penality-of-session", component: AllPenalityOfSessionComponent, canActivate: [EntityGuard]
      },
      {
        path:"civility", component: CivilityComponent, canActivate: [EntityGuard]
      },
      {
        path:"family-situation", component: FamilySituationComponent, canActivate: [EntityGuard]
      },
      {
        path:"piece-type", component: PieceTypeComponent, canActivate: [EntityGuard]
      },
      {
        path:"poste", component: PosteComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-details-session", component: ViewMoreDetailsSessionComponent, canActivate: [EntityGuard]
      },
      {
        path:"payment-status", component: PaymentStatus, canActivate: [EntityGuard]
      },
      {
        path:"penalty", component: PenaltyComponent, canActivate: [EntityGuard]
      },
      {
        path:"penality-type", component: PenalityTypeComponent, canActivate: [EntityGuard]
      },
      {
        path:"all-payment-of-session", component: AllPaymentOfSessionComponent, canActivate: [EntityGuard]
      },
      {
        path:"status", component: StatusComponent, canActivate: [EntityGuard]
      },
      {
        path:"detail-session-of-tontine", component: DetailSessionOfTontineComponent, canActivate: [EntityGuard]
      },
      {
        path:"detail-cycle", component: DetailCycleComponent, canActivate: [EntityGuard]
      },
      {
        path:"session", component: SessionComponent, canActivate: [EntityGuard]
      },
      {
        path:"cycle", component: CycleComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-details-tontine", component: ViewDetailsTontineComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-participant", component: ViewMoreParticipantComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-subscription-offer", component: ViewMoreSubscriptionOfferComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-detail-subscription", component: ViewDetailSubscriptionComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-detail-payment", component: ViewDetailPaymentComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-security-deposit", component: ViewMoreSecurityDepositComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-detail-mutual-investment", component: ViewDetailMutualInvestmentComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-sponsores", component: SponsoresComponent, canActivate: [EntityGuard]
      },
      {
        path:"centers", component: CentersComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-area", component: ViewMoreAreaComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-club", component: ViewMoreAreClubComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more", component: ViewMoreComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-posts", component: ViewMorePostComponent, canActivate: [EntityGuard]
      },
      {
        path : 'parameters',
        loadChildren: () => import('./parameter/parameter.module').then(m => m.ParameterModule)
      },
      {
        path : 'operations',
        loadChildren: () => import('./operation/operation.module').then(m => m.OperationModule)
      },
      {
        path : 'dashboards',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path : 'organization',
        loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule)
      },
    ]
   },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppModulesRoutingModule { }
