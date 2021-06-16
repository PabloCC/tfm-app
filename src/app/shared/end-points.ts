import { environment } from "../../environments/environment";

export class EndPoints {
  static SIGN_UP_ENDOINT = environment.API_REST_URL + '/auth/signup';
  static LOGIN_ENDOINT = environment.API_REST_URL + '/auth/signin';
  static CLASSROOMS_ENDPOINT = environment.API_REST_URL + '/classrooms';
  static TEACHERS_ENDPOINT = environment.API_REST_URL + '/auth/teachers';
  static ADMINS_ENDPOINT = environment.API_REST_URL + '/auth/admins';
  static FAMILIES_ENDPOINT = environment.API_REST_URL + '/auth/families';
  static STUDENTS_ENDPOINT = environment.API_REST_URL + '/students'

}