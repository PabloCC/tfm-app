import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from '../end-points';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {
  private classrooms: {id: number}[];
  private activeClassroom: any;

  constructor(private httpService: HttpService, private authService: AuthService) { 
    this.classrooms = [];
  }

  private fetchClassrooms() {
    return this.httpService
    .authBearer(this.authService.getToken())
    .get(EndPoints.CLASSROOMS_ENDPOINT)
      .toPromise()
      .then(res => { this.classrooms = res });
  }

  public async getClassrooms(): Promise<{id:number}[]> {
    await this.fetchClassrooms();
    return this.classrooms;
  }

  public getClassroomById(id) {
    return this.httpService.authBearer(this.authService.getToken())
      .get(EndPoints.CLASSROOMS_ENDPOINT + `/${id}`);
  }

  public getActiveClassroom() {
    return this.activeClassroom;
  }

  public setActiveClassroom(id) {
    this.activeClassroom = this.classrooms.find(item => item.id === id)
  }
}
