import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModulesRoutingModule } from './app-modules-routing.module';
import { AppContentComponent } from './app-content/app-content.component';
import { UiModule } from '../ui/ui.module';
import { Select2Module } from 'ng-select2-component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrganisationModule } from './organisation/organisation.module';

@NgModule({
  declarations: [
    AppContentComponent,
  ],
  imports: [
    CommonModule,
    AppModulesRoutingModule,
    UiModule,
    DashboardModule,
    OrganisationModule,
    Select2Module,
    TooltipModule
    
  ]
})
export class AppModulesModule { }
