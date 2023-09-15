import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { ProfilesComponent } from './profiles/profiles.component';
import { GeneralComponent } from './general/general.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {path:"", component: ProfilesComponent, canActivate: [EntityGuard],
  children: [
    {path:"", component: GeneralComponent, canActivate: [EntityGuard]},
    {path:"setting", component: SettingComponent, canActivate: [EntityGuard]},

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }