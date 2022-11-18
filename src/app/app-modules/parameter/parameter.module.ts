import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParameterRoutingModule } from './parameter-routing.module';
import { ParametersComponent } from './parameters/parameters.component';


@NgModule({
  declarations: [
    ParametersComponent,
  ],
  imports: [
    CommonModule,
    ParameterRoutingModule
  ]
})
export class ParameterModule { }
