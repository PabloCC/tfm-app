import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from '../end-points';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {
  private classrooms: [];

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

  public async getClassrooms(): Promise<[]> {
    if(this.classrooms.length) {
      return this.classrooms;
    } else {
      await this.fetchClassrooms();
      return this.classrooms;
    }
   
  }
}
