import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {
  @Input() students: any[];
  assistanceForm: FormGroup;

  constructor(private modalController: ModalController) { 
    this.students = [];
  }

  ngOnInit() {
    this.assistanceForm = new FormGroup({
      students: new FormArray(this.students.map(() => new FormControl(true, [Validators.required])))
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
    });
  }

  onSubmit() {
    const values = this.assistanceForm.get('students').value;
    this.modalController.dismiss({
      students: this.students.filter((item, i) => values[i])
    });
  }
}
