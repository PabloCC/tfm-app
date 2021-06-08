import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.page.html',
  styleUrls: ['./create-classroom.page.scss'],
})
export class CreateClassroomPage implements OnInit {
  createClassroomForm: FormGroup;

  constructor(private httpService: HttpService, private authService: AuthService) {
    this.createClassroomForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const body = {
      name: this.createClassroomForm.get('name').value,
    }

    this.httpService
      .authBearer(this.authService.getToken())
      .post(EndPoints.CLASSROOMS_ENDPOINT, body)
      .subscribe();
  }
}
