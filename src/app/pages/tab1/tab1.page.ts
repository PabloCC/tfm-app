import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';
import { ClassroomsService } from 'src/app/shared/services/classrooms.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  classrooms: {id: number}[];
  isAdmin: boolean;

  constructor(
    private classroomsService: ClassroomsService, 
    private router: Router, 
    private authService: AuthService,
    private httpService: HttpService,
    private alertController: AlertController) {
    this.isAdmin = false;
  }

  ionViewWillEnter() {
    this.getClassrooms();
    this.isAdmin = this.authService.getRole() === 'ADMIN';
  }
  
  ngOnInit(): void {
  }

  async getClassrooms() {
    this.classrooms = await this.classroomsService.getClassrooms();  
  }

  onEdit(e: MouseEvent, id) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.router.navigate(['/tabs/tab1/edit-classroom/' + id]);
  }

  async onRemove(e: MouseEvent, id) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const alert = await this.alertController.create({
      header: 'Cuidado',
      message: '¿Estás seguro de eliminar el aula?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
        }, 
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: this.removeClassroom.bind(this, id), 
        }
      ]
    });

    await alert.present();
  }

  removeClassroom(id) {
    this.httpService.authBearer(this.authService.getToken())
    .successful('Aula eliminada correctamente')
    .delete(EndPoints.CLASSROOMS_ENDPOINT + `/${id}`)
    .toPromise()
    .then(() => {
      this.classrooms = this.classrooms.filter(item => item.id !== id);
    });
  }
}
