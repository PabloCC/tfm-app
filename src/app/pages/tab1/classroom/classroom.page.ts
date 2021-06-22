import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { AssistancePage } from 'src/app/shared/components/assistance/assistance.page';
import { EndPoints } from 'src/app/shared/end-points';
import { ClassroomsService } from 'src/app/shared/services/classrooms.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})
export class ClassroomPage implements OnInit {
  isTeacher: boolean;
  classroom: any;
  students: [];
  subscription: Subscription;
  title: string;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private classroomService: ClassroomsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController) {
    this.isTeacher = false;
  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url.includes('/tabs/tab1/classroom')) {
          this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    this.classroom = this.classroomService.getActiveClassroom();

    if (!this.classroom) {
      const id = this.route.snapshot.params.id;

      this.classroomService.getClassroomById(id)
      .toPromise().then(res => {
        this.classroomService.setActiveClassroom(res.id);
        this.students = res.students;
        this.title = res.name;
      })
    } else {
      this.title = this.classroom.name;
      this.students = this.classroom.students;
    }
    
    this.isTeacher = this.authService.isTeacher();
  }

  onClickStudent(id) {
    this.router.navigate(['/tabs/tab1/student', id]);
  }

  async addAssistance() {
    const modal = await this.modalController.create({
      component: AssistancePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      componentProps: {
        students: this.students,
      } // Get the top-most ion-modal
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.students) {
      this.saveAssistances(data.students);
    }
  }

  saveAssistances(students) {
    students.forEach(item => {
      const body = {
        date: new Date(Date.now()).toISOString().split(" ")[0],
        isPresent: true,
        student: item
      }

      this.httpService.authBearer(this.authService.getToken())
      .successful('Asistencias guardadas')
      .post(EndPoints.ASSISTANCES_ENDPOINT, body)
      .subscribe();
    })
  }
}
