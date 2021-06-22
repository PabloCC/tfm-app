import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  subscription: Subscription;
  isTeacher: boolean;
  student: any;
  title: string;
  image: string;
  birthdate: Date;
  today: string;
  goals: [];
  classroom;
  goalsForm: FormGroup;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private alertController: AlertController) {
      this.isTeacher = false;
      this.today = new Date(Date.now()).toLocaleString().split(" ")[0];
      this.goals = [];
  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url.includes('/tabs/tab1/student')) {
          this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    const id = this.route.snapshot.params.id;

    this.student = await this.studentService.getStudentById(id).toPromise();
    this.studentService.setActiveStudent(this.student.id);
    this.title = this.student.name;
    this.image = this.student.image;
    this.birthdate = new Date(this.student.birthdate);

    this.classroom = await this.httpService.authBearer(this.authService.getToken())
    .get(EndPoints.CLASSROOMS_ENDPOINT + '/student/' + this.student.id)
    .toPromise();

    this.getGoals(this.classroom.id);
    this.isTeacher = this.authService.isTeacher();
  }

  public getGoals(id) {
    this.httpService.authBearer(this.authService.getToken())
    .get(EndPoints.GOALS_ENDPOINT)
    .toPromise()
    .then(res => {
      const goals = res;
      this.goals = goals.filter(item => item.classroom.id === id);

      this.goalsForm = new FormGroup({
        goals: new FormArray(this.goals.map(() => new FormControl(false,)))
      }
      );
    });
  }

  onEdit() {
    const id = this.route.snapshot.params.id;
    this.router.navigate(['/tabs/tab1/edit-student/' + id]);
  }

  async onRemove() {
    const alert = await this.alertController.create({
      header: 'Cuidado',
      message: '¿Estás seguro de eliminar el estudiante?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
        }, 
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: this.removeStudent.bind(this), 
        }
      ]
    });

    await alert.present();
  }

  removeStudent() {
    const id = this.route.snapshot.params.id;

    this.httpService.authBearer(this.authService.getToken())
    .successful('Estudiante eliminado correctamente')
    .delete(EndPoints.STUDENTS_ENDPOINT + `/${id}`)
    .toPromise()
    .then(() => {
      this.router.navigate(['/tabs/tab1/classroom/' + this.classroom.id]);
    });
  }

  saveGoals() {
    const form = this.goalsForm.get('goals').value;

   

    this.goals.forEach((item, index) => {
      if (form[index]) {
        debugger;
        const body = {
          date: new Date(Date.now()).toISOString().split(" ")[0],
          student: this.student,
          goal: item
        }

        this.httpService.authBearer(this.authService.getToken())
        .successful('Hito guardado correctamente')
        .post(EndPoints.ACHIEVEMENT_ENDPOINT, body)
        .subscribe();
      }
    });
  }  
}
