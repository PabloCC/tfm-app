import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { Role } from 'src/app/core/models/role.enum';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'create-classroom',
    loadChildren: () => import('./create-classroom/create-classroom.module').then( m => m.CreateClassroomPageModule),
    canActivate: [RoleGuard],
    data: {roles: [Role.ADMIN]},
  },
  {
    path: 'classroom/:id',
    loadChildren: () => import('./classroom/classroom.module').then( m => m.ClassroomPageModule)
  },
  {
    path: 'edit-classroom/:id',
    loadChildren: () => import('./edit-classroom/edit-classroom.module').then( m => m.EditClassroomPageModule),
    canActivate: [RoleGuard],
    data: {roles: [Role.ADMIN]},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
