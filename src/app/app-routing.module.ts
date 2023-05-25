import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'app-modules',
    loadChildren: () => import('./app-modules/app-modules.module').then(m => m.AppModulesModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./sign/sign.module').then(m => m.SignModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
