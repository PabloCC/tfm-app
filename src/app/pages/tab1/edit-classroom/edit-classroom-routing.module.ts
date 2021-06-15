import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditClassroomPage } from './edit-classroom.page';

const routes: Routes = [
  {
    path: '',
    component: EditClassroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditClassroomPageRoutingModule {}
