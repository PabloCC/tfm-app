import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStudentPageRoutingModule } from './add-student-routing.module';

import { AddStudentPage } from './add-student.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStudentPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule,
  ],
  declarations: [AddStudentPage]
})
export class AddStudentPageModule {}
