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


@NgModule({
  declarations: [
    UserComponent,
    CenterComponent,
    ClubComponent,
    OrganismComponent,
    AreaComponent,
    MainOfficeComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrganisationModule { }
