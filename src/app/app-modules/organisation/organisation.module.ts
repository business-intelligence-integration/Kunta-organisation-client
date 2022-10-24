import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { UserComponent } from './user/user.component';
import { CenterComponent } from './center/center.component';
import { ClubComponent } from './club/club.component';
import { OrganismComponent } from './organism/organism.component';


@NgModule({
  declarations: [
    UserComponent,
    CenterComponent,
    ClubComponent,
    OrganismComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule
  ]
})
export class OrganisationModule { }
