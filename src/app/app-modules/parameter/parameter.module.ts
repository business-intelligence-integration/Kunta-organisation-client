import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParameterRoutingModule } from './parameter-routing.module';
import { ParametersComponent } from './parameters/parameters.component';
import { TransversalityComponent } from './transversality/transversality.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GainComponent } from './gain/gain.component';


@NgModule({
  declarations: [
    ParametersComponent,
    TransversalityComponent,
    FrequencyComponent,
    GainComponent,
  ],
  imports: [
    CommonModule,
    ParameterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ParameterModule { }
