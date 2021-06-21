import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from '../../core/services/http.service';
import { EndPoints } from '../../shared/end-points';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm: FormGroup;

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router) { 
    this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      username: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      role: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const body = {
      name: this.signUpForm.get('name').value,
      username: this.signUpForm.get('username').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      role: this.signUpForm.get('role').value,
    }

    this.httpService
    .successful('Registro completado')
    .post(EndPoints.SIGN_UP_ENDOINT, body)
    .toPromise()
    .then(() => {
      this.router.navigate(['/tabs']);
    });
  }
}
