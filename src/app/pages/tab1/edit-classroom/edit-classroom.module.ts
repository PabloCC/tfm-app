import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditClassroomPageRoutingModule } from './edit-classroom-routing.module';

import { EditClassroomPage } from './edit-classroom.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditClassroomPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [EditClassroomPage]
})
export class EditClassroomPageModule {}
