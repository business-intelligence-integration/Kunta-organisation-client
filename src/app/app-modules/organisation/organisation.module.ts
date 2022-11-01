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
import { ViewMoreAreaComponent } from './center/view-more-area/view-more-area.component';


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
    ViewMoreAreaComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrganisationModule { }
