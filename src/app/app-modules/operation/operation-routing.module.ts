import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { OperationsComponent } from './operations/operations.component';

const routes: Routes = [
  {path:"", component: OperationsComponent, canActivate: [EntityGuard]},
  {path:"operations", component: OperationsComponent, canActivate: [EntityGuard]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
