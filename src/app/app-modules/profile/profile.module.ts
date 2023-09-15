import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilesComponent } from './profiles/profiles.component';
import { GeneralComponent } from './general/general.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
    declarations: [
    ProfilesComponent,
    GeneralComponent,
    SettingComponent
  ],
    imports: [
      CommonModule,
      ProfileRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      TooltipModule
    ]
  })
  export class ProfileModule { }