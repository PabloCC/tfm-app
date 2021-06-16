import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() images: any[];

  constructor(private modalController: ModalController) { 
    this.images = [];
  }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
    });
  }

  onSelectImage(index) {
    this.modalController.dismiss({
      image: `${index}.svg`
    });
  }

}
