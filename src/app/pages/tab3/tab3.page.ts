import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  notes: {id: number, date: any}[];
  subscription : Subscription;
  user: any;
  isAdmin: boolean;
  isTeacher: boolean;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private httpService: HttpService) {
      this.notes = [];
  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && event.url === '/tabs/tab3') {
            this.onEnter();
        }
    });
  }

  public async onEnter(): Promise<void> {
    this.user = this.authService.getUserWithoutToken();
    await this.getNotes();
  }

  async getNotes() {
    this.notes = await this.httpService.authBearer(this.authService.getToken())
    .get(EndPoints.NOTES_ENDPOINT)
    .toPromise();

    this.notes = this.notes.map(item => {
      item.date = new Date(item.date)
      return item;
    });
  }
}
