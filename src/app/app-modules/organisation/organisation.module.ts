import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { UserComponent } from './user/user.component';
import { CenterComponent } from './center/center.component';
import { ClubComponent } from './club/club.component';
import { OrganismComponent } from './organism/organism.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaComponent } from './area/area.component';
import { MainOfficeComponent } from './main-office/main-office.component';
import { AdminComponent } from './user/admin/admin.component';
import { MemberComponent } from './user/member/member.component';
import { MutulistComponent } from './user/mutulist/mutulist.component';
import { OperatorComponent } from './user/operator/operator.component';
import { ViewMorePostComponent } from './main-office/view-more-post/view-more-post.component';
import { ViewMoreComponent } from './club/view-more/view-more.component';
import { ViewMoreAreClubComponent } from './area/view-more-are-club/view-more-are-club.component';
import { ViewMoreAreaComponent } from './main-office/centers/view-more-area/view-more-area.component';
import { CentersComponent } from './main-office/centers/centers.component';
import { GeneralAssemblyComponent } from './main-office/general-assembly/general-assembly.component';
import { ExecutiveBoardComponent } from './main-office/executive-board/executive-board.component';
import { GovernanceCompensationCommitteeComponent } from './main-office/governance-compensation-committee/governance-compensation-committee.component';
import { ProductionMonitoringCommitteeComponent } from './main-office/production-monitoring-committee/production-monitoring-committee.component';
import { StrategicDevelopmentCommitteeComponent } from './main-office/strategic-development-committee/strategic-development-committee.component';
import { MembersGeneralAssemblyComponent } from './main-office/centers/members-general-assembly/members-general-assembly.component';
import { AccountantComponent } from './main-office/centers/accountant/accountant.component';
import { AdminSysComponent } from './main-office/centers/admin-sys/admin-sys.component';
import { DevelopmentCommitteeComponent } from './main-office/centers/development-committee/development-committee.component';
import { ExecutiveBoardComponentCenter } from './main-office/centers/executive-board/executive-board.component';
import { ProductionManagerComponent } from './main-office/centers/production-manager/production-manager.component';
import { ClubsGeneralAssemblyComponent } from './main-office/centers/clubs-general-assembly/clubs-general-assembly.component';
import { MemberToGccComponent } from './main-office/centers/member-to-gcc/member-to-gcc.component';
import { CommunicationAgentToAreaComponent } from './area/communication-agent-to-area/communication-agent-to-area.component';
import { DataEntryAgentToAreaComponent } from './area/data-entry-agent-to-area/data-entry-agent-to-area.component';


@NgModule({
  declarations: [
    UserComponent,
    CenterComponent,
    ClubComponent,
    OrganismComponent,
    AreaComponent,
    MainOfficeComponent,
    AdminComponent,
    MemberComponent,
    MutulistComponent,
    OperatorComponent,
    ViewMorePostComponent,
    ViewMoreComponent,
    ViewMoreAreClubComponent,
    ViewMoreAreaComponent,
    CentersComponent,
    GeneralAssemblyComponent,
    ExecutiveBoardComponent,
    ExecutiveBoardComponentCenter,
    GovernanceCompensationCommitteeComponent,
    ProductionMonitoringCommitteeComponent,
    StrategicDevelopmentCommitteeComponent,
    MembersGeneralAssemblyComponent,
    AccountantComponent,
    AdminSysComponent,
    DevelopmentCommitteeComponent,
    ExecutiveBoardComponent,
    ProductionManagerComponent,
    ClubsGeneralAssemblyComponent,
    MemberToGccComponent,
    CommunicationAgentToAreaComponent,
    DataEntryAgentToAreaComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrganisationModule { }
