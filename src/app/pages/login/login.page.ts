import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../core/http.service';
import { EndPoints } from '../../shared/end-points';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private httpService: HttpService) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const body = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    }

    this.httpService.post(EndPoints.LOGIN_ENDOINT, body).subscribe();
  }
}
