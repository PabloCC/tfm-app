import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from '../end-points';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private activeStudent: any;

  constructor(private httpService: HttpService, private authService: AuthService) { 
  }

  public getStudentById(id) {
    return this.httpService.authBearer(this.authService.getToken())
      .get(EndPoints.STUDENTS_ENDPOINT + `/${id}`);
  }

  public getActiveStudent() {
    return this.activeStudent;
  }

  public setActiveStudent(student) {
    this.activeStudent = student;
  }
}
