import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin: boolean;
  isFamily: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
    this.isFamily = this.authService.isFamily();
  }

}
