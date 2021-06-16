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
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {
  createStudentForm: FormGroup;
  classroom: any;
  families: [];
  images: any[];

  constructor(
    private httpService: HttpService, 
    private authService: AuthService, 
    private router: Router, 
    private classroomService: ClassroomsService,
    private modalController: ModalController) {
      this.images = new Array(17);
      this.createStudentForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
        ]),
        birthdate: new FormControl('', [
          Validators.required,
        ]),
        image: new FormControl('', [
          Validators.required,
        ]),
        families: new FormControl([], [
          Validators.required
        ]),
      });
  }

  
  ngOnInit() {
    this.httpService.authBearer(this.authService.getToken())
      .get(EndPoints.FAMILIES_ENDPOINT)
      .toPromise()
      .then(res => {
        this.families = res;
      });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      componentProps: {
        images: this.images
      } // Get the top-most ion-modal
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.image) {
      this.createStudentForm.get('image').setValue(data.image);
    }
  }


  onSubmit() {
    this.classroom = this.classroomService.getActiveClassroom();
    const body = {
      name: this.createStudentForm.get('name').value,
      birthdate: this.createStudentForm.get('birthdate').value,
      families: this.createStudentForm.get('families').value,
      image: this.createStudentForm.get('image').value,
      classroom: this.classroom,
    }

    this.httpService.authBearer(this.authService.getToken())
      .successful('Estudiante creado correctamente')
      .error('Error al crear el usuario')
      .post(EndPoints.STUDENTS_ENDPOINT, body)
      .toPromise()
      .then(() => {
        this.router.navigate(['/tabs/tab1/classroom/', this.classroom.id])
      });
  }

}
