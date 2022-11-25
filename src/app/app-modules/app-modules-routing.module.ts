import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from '../core/services/entity.guard';
import { AppContentComponent } from './app-content/app-content.component';
import { ViewMoreAreClubComponent } from './organisation/area/view-more-are-club/view-more-are-club.component';
import { ViewMoreAreaComponent } from './organisation/main-office/centers/view-more-area/view-more-area.component';
import { ViewMoreComponent } from './organisation/club/view-more/view-more.component';
import { AccountantComponent } from './organisation/main-office/centers/accountant/accountant.component';
import { AdminSysComponent } from './organisation/main-office/centers/admin-sys/admin-sys.component';
import { CentersComponent } from './organisation/main-office/centers/centers.component';
import { ClubsGeneralAssemblyComponent } from './organisation/main-office/centers/clubs-general-assembly/clubs-general-assembly.component';
import { DevelopmentCommitteeComponent } from './organisation/main-office/centers/development-committee/development-committee.component';
import { ExecutiveBoardComponentCenter } from './organisation/main-office/centers/executive-board/executive-board.component';
import { MemberToGccComponent } from './organisation/main-office/centers/member-to-gcc/member-to-gcc.component';
import { MembersGeneralAssemblyComponent } from './organisation/main-office/centers/members-general-assembly/members-general-assembly.component';
import { ProductionManagerComponent } from './organisation/main-office/centers/production-manager/production-manager.component';
import { ExecutiveBoardComponent } from './organisation/main-office/executive-board/executive-board.component';
import { GeneralAssemblyComponent } from './organisation/main-office/general-assembly/general-assembly.component';
import { GovernanceCompensationCommitteeComponent } from './organisation/main-office/governance-compensation-committee/governance-compensation-committee.component';
import { ProductionMonitoringCommitteeComponent } from './organisation/main-office/production-monitoring-committee/production-monitoring-committee.component';
import { StrategicDevelopmentCommitteeComponent } from './organisation/main-office/strategic-development-committee/strategic-development-committee.component';
import { ViewMorePostComponent } from './organisation/main-office/view-more-post/view-more-post.component';
import { CommunicationAgentToAreaComponent } from './organisation/area/communication-agent-to-area/communication-agent-to-area.component';
import { DataEntryAgentToAreaComponent } from './organisation/area/data-entry-agent-to-area/data-entry-agent-to-area.component';
import { SponsoresComponent } from './organisation/user/sponsores/sponsores.component';
import { ViewMoreParticipantComponent } from './operation/tontine/view-more-participant/view-more-participant.component';
import { ViewDetailsTontineComponent } from './operation/tontine/view-details-tontine/view-details-tontine.component';
import { CycleComponent } from './parameter/cycle/cycle.component';
import { SessionComponent } from './parameter/session/session.component';
import { DetailCycleComponent } from './operation/tontine/detail-cycle/detail-cycle.component';
import { DetailSessionOfTontineComponent } from './operation/tontine/detail-session-of-tontine/detail-session-of-tontine.component';

const routes: Routes = [
  {
    path:"", component: AppContentComponent,
    children: [
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
        path:"view-more-sponsores", component: SponsoresComponent, canActivate: [EntityGuard]
      },
      {
        path:"account", component: AccountantComponent, canActivate: [EntityGuard]
      },
      {
        path:"data-entry-agent-to-area", component: DataEntryAgentToAreaComponent, canActivate: [EntityGuard]
      },
      {
        path:"communication-agent-to-area", component: CommunicationAgentToAreaComponent, canActivate: [EntityGuard]
      },
      {
        path:"production-manager", component: ProductionManagerComponent, canActivate: [EntityGuard]
      },
      {
        path:"members-general-assembly", component: MembersGeneralAssemblyComponent, canActivate: [EntityGuard]
      },
      {
        path:"member-to-gcc", component: MemberToGccComponent, canActivate: [EntityGuard]
      },
      {
        path:"executive-board-center", component: ExecutiveBoardComponentCenter, canActivate: [EntityGuard]
      },
      {
        path:"development-committee", component: DevelopmentCommitteeComponent, canActivate: [EntityGuard]
      },
      {
        path:"clubs-general-assembly", component: ClubsGeneralAssemblyComponent, canActivate: [EntityGuard]
      },
      {
        path:"admin-sys", component: AdminSysComponent, canActivate: [EntityGuard]
      },
      {
        path:"accountant.component", component: AccountantComponent, canActivate: [EntityGuard]
      },
      {
        path:"members-general-assembly", component: MembersGeneralAssemblyComponent, canActivate: [EntityGuard]
      },
      {
        path:"strategic-development-committee", component: StrategicDevelopmentCommitteeComponent, canActivate: [EntityGuard]
      },
      {
        path:"production-monitoring-committee", component: ProductionMonitoringCommitteeComponent, canActivate: [EntityGuard]
      },
      {
        path:"governance-compensation-committee", component: GovernanceCompensationCommitteeComponent, canActivate: [EntityGuard]
      },
      {
        path:"executive-board", component: ExecutiveBoardComponent, canActivate: [EntityGuard]
      },
      {
        path:"general-assembly", component: GeneralAssemblyComponent, canActivate: [EntityGuard]
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
