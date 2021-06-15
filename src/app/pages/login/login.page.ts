import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { 
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs']);
    }
     
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

    this.authService.login(body);
  }
}
