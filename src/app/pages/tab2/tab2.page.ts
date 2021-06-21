import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  publications: {id: number, date: any}[];
  subscription : Subscription;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private httpService: HttpService) {
      this.publications = [];
  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && event.url === '/tabs/tab2') {
            this.onEnter();
        }
    });
  }

  public async onEnter(): Promise<void> {
    await this.getPublications();
  }

  async getPublications() {
    this.publications = await this.httpService.authBearer(this.authService.getToken())
    .get(EndPoints.PUBLICATIONS_ENDPOINT)
    .toPromise();

    this.publications = this.publications.map(item => {
      item.date = new Date(item.date)
      return item;
    });
  }
}
