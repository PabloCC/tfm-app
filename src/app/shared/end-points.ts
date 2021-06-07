import { environment } from "../../environments/environment";

export class EndPoints {
  static SIGN_UP_ENDOINT = environment.API_REST_URL + '/auth/signup';
  static LOGIN_ENDOINT = environment.API_REST_URL + '/auth/signin';
  static CLASSROOMS_ENDPOINT = environment.API_REST_URL + '/classrooms';
}