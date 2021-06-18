import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';
import { ClassroomsService } from 'src/app/shared/services/classrooms.service';
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

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private classroomService: ClassroomsService,
    private httpService: HttpService) {
      this.isTeacher = false;
      this.today = new Date(Date.now()).toLocaleString().split(" ")[0];
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

    const student = await this.studentService.getStudentById(id).toPromise();
    this.studentService.setActiveStudent(student.id);
    this.title = student.name;
    this.image = student.image;
    this.birthdate = new Date(student.birthdate);

    const classroom = await this.httpService.authBearer(this.authService.getToken())
    .get(EndPoints.CLASSROOMS_ENDPOINT + '/student/' + student.id)
    .toPromise();

    this.getGoals(classroom.id);
    this.isTeacher = this.authService.isTeacher();
  }

  public getGoals(id) {
    this.httpService.authBearer(this.authService.getToken())
    .get(EndPoints.GOALS_ENDPOINT)
    .toPromise()
    .then(res => {
      const goals = res;
      this.goals = goals.filter(item => item.classroom.id === id);
    });
  }
}
