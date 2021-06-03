import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string;
  email: string;

  constructor(private authService: AuthService) { 
    this.username = this.authService.getUsername();
    this.email = this.authService.getEmail();
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
