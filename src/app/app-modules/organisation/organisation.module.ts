import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { UserComponent } from './user/user.component';
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
import { AccountComponent } from './account/account.component';
import { SponsoresComponent } from './user/sponsores/sponsores.component';
import { Select2Module } from 'ng-select2-component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { PostsOfCentersComponent } from './main-office/centers/posts-of-centers/posts-of-centers.component';
import { PostsOfAreaComponent } from './area/posts-of-area/posts-of-area.component';
import { PostsOfClubComponent } from './club/posts-of-club/posts-of-club.component';
import { PostsOfMainOfficeComponent } from './main-office/posts-of-main-office/posts-of-main-office.component';


@NgModule({
  declarations: [
    UserComponent,
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
    AccountComponent,
    SponsoresComponent,
    PostsOfMainOfficeComponent,
    PostsOfCentersComponent,
    PostsOfAreaComponent,
    PostsOfClubComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    TooltipModule
  ],
  exports: [
    OrganismComponent,
    UserComponent,
  ]
})
export class OrganisationModule { }
