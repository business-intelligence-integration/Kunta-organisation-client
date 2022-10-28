import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { OrganismComponent } from './organism/organism.component';

const routes: Routes = [
  {path:"", component: OrganismComponent, canActivate: [EntityGuard]},
  {path:"organization", component: OrganismComponent, canActivate: [EntityGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
