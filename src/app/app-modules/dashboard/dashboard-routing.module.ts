import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"", component: HomeComponent, canActivate: [EntityGuard]},
  {path:"dashboards", component: HomeComponent, canActivate: [EntityGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
