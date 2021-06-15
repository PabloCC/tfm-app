import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string;
  username: string;
  email: string;
  role: string;

  constructor(private authService: AuthService) { 
    this.name = this.authService.getName();
    this.username = this.authService.getUsername();
    this.email = this.authService.getEmail();
    this.role = this.authService.getRole();
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
