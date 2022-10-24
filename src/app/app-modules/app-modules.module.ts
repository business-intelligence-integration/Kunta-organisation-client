import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModulesRoutingModule } from './app-modules-routing.module';
import { AppContentComponent } from './app-content/app-content.component';
import { UiModule } from '../ui/ui.module';


@NgModule({
  declarations: [
    AppContentComponent
  ],
  imports: [
    CommonModule,
    AppModulesRoutingModule,
    UiModule,
  ]
})
export class AppModulesModule { }
