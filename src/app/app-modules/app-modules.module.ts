import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModulesRoutingModule } from './app-modules-routing.module';
import { AppContentComponent } from './app-content/app-content.component';
import { UiModule } from '../ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    AppContentComponent
  ],
  imports: [
    CommonModule,
    AppModulesRoutingModule,
    UiModule,
    Select2Module
    
  ]
})
export class AppModulesModule { }
