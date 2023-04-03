import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityGuard } from 'src/app/core/services/entity.guard';
import { AreaComponent } from './area/area.component';
import { ClubComponent } from './club/club.component';
import { CentersComponent } from './main-office/centers/centers.component';
import { PostsOfMainOfficeComponent } from './main-office/posts-of-main-office/posts-of-main-office.component';
import { OrganismComponent } from './organism/organism.component';
import { AdminComponent } from './user/admin/admin.component';
import { MemberComponent } from './user/member/member.component';
import { MutulistComponent } from './user/mutulist/mutulist.component';
import { OperatorComponent } from './user/operator/operator.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"", component: OrganismComponent, canActivate: [EntityGuard],
  children: [
    {path:"", component: UserComponent, canActivate: [EntityGuard]},
    {path:"users", component: UserComponent, canActivate: [EntityGuard]},
    {path:"clubs", component: ClubComponent, canActivate: [EntityGuard]},
    {path:"areas", component: AreaComponent, canActivate: [EntityGuard]},
    {path:"centers", component: CentersComponent, canActivate: [EntityGuard]},
    {path:"users/admins", component: AdminComponent, canActivate: [EntityGuard]},
    {path:"users/members", component: MemberComponent, canActivate: [EntityGuard]},
    {path:"users/mutualistes", component: MutulistComponent, canActivate: [EntityGuard]},
    {path:"users/operators", component: OperatorComponent, canActivate: [EntityGuard]},
    {path:"main-office/posts", component: PostsOfMainOfficeComponent, canActivate: [EntityGuard]},
   
   
    
  ]
},
  // {path:"organization", component: OrganismComponent, canActivate: [EntityGuard]},
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
