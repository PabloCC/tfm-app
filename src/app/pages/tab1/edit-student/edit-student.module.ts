import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStudentPageRoutingModule } from './edit-student-routing.module';

import { EditStudentPage } from './edit-student.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStudentPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule,
  ],
  declarations: [EditStudentPage]
})
export class EditStudentPageModule {}
