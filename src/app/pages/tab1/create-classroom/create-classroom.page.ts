import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.page.html',
  styleUrls: ['./create-classroom.page.scss'],
})
export class CreateClassroomPage implements OnInit {
  teachers: {id: number}[];
  createClassroomForm: FormGroup;

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router) {
    this.teachers = [];
    this.createClassroomForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      stage: new FormControl('', [
        Validators.required,
      ]),
      teachers: new FormControl([], [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
    this.httpService.authBearer(this.authService.getToken())
      .get(EndPoints.TEACHERS_ENDPOINT)
      .toPromise()
      .then(res => {
        this.teachers = res;
      });
  }

  onSubmit() {
    const teachersSelected = this.teachers.filter(item => this.createClassroomForm.get('teachers').value.includes(item.id))
    const body = {
      name: this.createClassroomForm.get('name').value,
      stage: parseInt(this.createClassroomForm.get('stage').value),
      teachers: teachersSelected
    }

    this.httpService.authBearer(this.authService.getToken())
      .successful('Aula creada')
      .post(EndPoints.CLASSROOMS_ENDPOINT, body)
      .toPromise()
      .then(res => {
        this.router.navigate(['/tabs/tab1'])
      });
  }
}
