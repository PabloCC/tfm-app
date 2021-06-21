import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalPage } from 'src/app/shared/components/modal/modal.page';
import { EndPoints } from 'src/app/shared/end-points';
import { ClassroomsService } from 'src/app/shared/services/classrooms.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.page.html',
  styleUrls: ['./add-goal.page.scss'],
})
export class AddGoalPage implements OnInit {
  createGoalForm: FormGroup;
  classroom: any;
  families: [];
  images: any[];

  constructor(
    private httpService: HttpService, 
    private authService: AuthService, 
    private router: Router, 
    private classroomService: ClassroomsService,
    private modalController: ModalController) {
      this.images = new Array(32);
      this.createGoalForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
        ]),
        image: new FormControl('', [
          Validators.required,
        ]),
      });
  }

  
  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      componentProps: {
        images: this.images,
        folder: 'goals'
      } // Get the top-most ion-modal
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.image) {
      this.createGoalForm.get('image').setValue(data.image);
    }
  }


  onSubmit() {
    this.classroom = this.classroomService.getActiveClassroom();
    const body = {
      name: this.createGoalForm.get('name').value,
      date: new Date(Date.now()).toLocaleString().split(" ")[0],
      image: this.createGoalForm.get('image').value,
      classroom: this.classroom,
    }

    this.httpService.authBearer(this.authService.getToken())
      .successful('Logro creado correctamente')
      .error('Error al crear el logro')
      .post(EndPoints.GOALS_ENDPOINT, body)
      .toPromise()
      .then(() => {
        this.router.navigate(['/tabs/tab1/classroom/', this.classroom.id])
      });
  }

}
