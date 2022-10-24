import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganismComponent } from './organism/organism.component';

const routes: Routes = [
  {path:"", component: OrganismComponent},
  {path:"organization", component: OrganismComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
