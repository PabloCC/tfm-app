import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistancePageRoutingModule } from './assistance-routing.module';

import { AssistancePage } from './assistance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssistancePage]
})
export class AssistancePageModule {}
