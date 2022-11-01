import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from '../core/services/entity.guard';
import { AppContentComponent } from './app-content/app-content.component';
import { ViewMoreAreClubComponent } from './organisation/area/view-more-are-club/view-more-are-club.component';
import { ViewMoreAreaComponent } from './organisation/center/view-more-area/view-more-area.component';
import { ViewMoreComponent } from './organisation/club/view-more/view-more.component';
import { ViewMorePostComponent } from './organisation/main-office/view-more-post/view-more-post.component';

const routes: Routes = [
  {
    path:"", component: AppContentComponent,
    children: [
      {
        path:"view-more-area", component: ViewMoreAreaComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more-club", component: ViewMoreAreClubComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-more", component: ViewMoreComponent, canActivate: [EntityGuard]
      },
      {
        path:"view-posts", component: ViewMorePostComponent, canActivate: [EntityGuard]
      },
      {
        path : 'dashboards',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path : 'organization',
        loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule)
      },
    ]
   },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppModulesRoutingModule { }
