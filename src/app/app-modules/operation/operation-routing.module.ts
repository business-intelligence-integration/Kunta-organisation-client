import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { MutualInvestmentComponent } from './mutual-investment/mutual-investment.component';
import { OperationsComponent } from './operations/operations.component';
import { TontineComponent } from './tontine/tontine.component';

const routes: Routes = [
  {path:"", component: OperationsComponent, canActivate: [EntityGuard],
  children: [
    {path:"tontines", component: TontineComponent, canActivate: [EntityGuard]},
    {path:"mutual-investment", component: MutualInvestmentComponent, canActivate: [EntityGuard]},
  ]},
  // {path:"operations", component: OperationsComponent, canActivate: [EntityGuard]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
