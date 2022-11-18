import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { ParametersComponent } from './parameters/parameters.component';

const routes: Routes = [
  {path:"", component: ParametersComponent, canActivate: [EntityGuard]},
  {path:"parameters", component: ParametersComponent, canActivate: [EntityGuard]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterRoutingModule { }
