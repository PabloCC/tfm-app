import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateClassroomPageRoutingModule } from './create-classroom-routing.module';

import { CreateClassroomPage } from './create-classroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateClassroomPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateClassroomPage]
})
export class CreateClassroomPageModule {}
