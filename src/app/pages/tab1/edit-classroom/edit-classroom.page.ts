import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.page.html',
  styleUrls: ['./edit-classroom.page.scss'],
})
export class EditClassroomPage implements OnInit {
  id;
  teachers: {id: number}[];
  updateClassroomForm: FormGroup;

  constructor(private httpService: HttpService, private authService: AuthService, private route: ActivatedRoute) {
    this.teachers = [];
    this.updateClassroomForm = new FormGroup({
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
    
    this.id = this.route.snapshot.params.id;

    this.httpService.authBearer(this.authService.getToken())
      .get(EndPoints.CLASSROOMS_ENDPOINT + `/${this.id}`)
      .toPromise()
      .then(res => {
        this.updateClassroomForm.setValue({
          name: res.name,
          stage: res.stage.toString(),
          teachers: res.teachers,
        })

        console.log(this.updateClassroomForm)
      });
  }

  onSubmit() {
    const body = {
      name: this.updateClassroomForm.get('name').value,
      stage: parseInt(this.updateClassroomForm.get('stage').value),
      teachers: this.updateClassroomForm.get('teachers')
    }

    this.httpService.authBearer(this.authService.getToken())
      .successful('Aula editada')
      .post(EndPoints.CLASSROOMS_ENDPOINT, body)
      .subscribe();
  }
}
