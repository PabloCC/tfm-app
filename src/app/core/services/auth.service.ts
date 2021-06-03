import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndPoints } from '../../shared/end-points';
import { HttpService } from './http.service';
import { Role } from '../models/role.enum';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  constructor(private httpService: HttpService, private router: Router, private jwt: JwtHelperService) {
  }

  login(body) {
    const request = this.httpService.post(EndPoints.LOGIN_ENDOINT, body).pipe().toPromise();

    request.then(
      res => {
        const token = res.accessToken;
        this.user = {
          username: this.jwt.decodeToken(token).username,
          email: this.jwt.decodeToken(token).email,
          role: this.jwt.decodeToken(token).role,
          token,
        };
        console.log(this.jwt.decodeToken(token));
      this.router.navigate(['/tabs/tab1']);
    });
  }

  logout(): void {
    this.user = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {
    return this.user != null && !(this.jwt.isTokenExpired(this.user.token));
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user.role);
  }
  

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN]);
  }

  isTeacher(): boolean {
    return this.hasRoles([Role.TEACHER]);
  }

  isFamily(): boolean {
    return this.hasRoles([Role.FAMILY]);
  }

  getUsername(): string {
    return this.user ? this.user.username : '???';
  }

  getEmail(): string {
    return this.user ? this.user.email : '???';
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

  getRole(): Role{
    return this.user  ? this.user.role : undefined;
  }

  setUser(user: User): void {
    this.user = user;
  }
}