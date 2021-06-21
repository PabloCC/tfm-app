import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalPage } from 'src/app/shared/components/modal/modal.page';
import { EndPoints } from 'src/app/shared/end-points';
import { ClassroomsService } from 'src/app/shared/services/classrooms.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {
  updateStudentForm: FormGroup;
  classroom: any;
  families: [];
  images: any[];
  id;

  constructor(
    private httpService: HttpService, 
    private authService: AuthService, 
    private router: Router, 
    private classroomService: ClassroomsService,
    private modalController: ModalController,
    private route: ActivatedRoute) {
      this.images = new Array(17);
      this.updateStudentForm = new FormGroup({
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
    
    this.id = this.route.snapshot.params.id;

    this.httpService.authBearer(this.authService.getToken())
      .get(EndPoints.STUDENTS_ENDPOINT + `/${this.id}`)
      .toPromise()
      .then(res => {
        this.updateStudentForm.setValue({
          name: res.name,
          birthdate: res.birthdate,
          image: res.image,
          families: res.parents,
        })
      });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      componentProps: {
        images: this.images,
        folder: 'profile'
      } // Get the top-most ion-modal
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.image) {
      this.updateStudentForm.get('image').setValue(data.image);
    }
  }

  onSubmit() {
    this.classroom = this.classroomService.getActiveClassroom();
    const body = {
      name: this.updateStudentForm.get('name').value,
      birthdate: this.updateStudentForm.get('birthdate').value,
      parents: this.updateStudentForm.get('families').value,
      image: this.updateStudentForm.get('image').value,
      classroom: this.classroom,
    }

    this.httpService.authBearer(this.authService.getToken())
      .successful('Estudiante editado correctamente')
      .error('Error al editar el usuario')
      .put(EndPoints.STUDENTS_ENDPOINT + `/${this.id}`, body)
      .toPromise()
      .then(() => {
        this.router.navigate(['/tabs/tab1/classroom/', this.classroom.id])
      });
  }
}
