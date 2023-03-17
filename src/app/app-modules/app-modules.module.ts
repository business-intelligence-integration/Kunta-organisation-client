import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModulesRoutingModule } from './app-modules-routing.module';
import { AppContentComponent } from './app-content/app-content.component';
import { UiModule } from '../ui/ui.module';
import { Select2Module } from 'ng-select2-component';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    AppContentComponent
  ],
  imports: [
    CommonModule,
    AppModulesRoutingModule,
    UiModule,
    Select2Module,
    TooltipModule
    
  ]
})
export class AppModulesModule { }
