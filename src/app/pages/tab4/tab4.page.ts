import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  student: any;
  subscription: Subscription;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && event.url === '/tabs/tab4') {
            this.onEnter();
        }
    });
  }

  public async onEnter(): Promise<void> {
    this.httpService.authBearer(this.authService.getToken())
      .get(EndPoints.STUDENTS_ENDPOINT)
      .toPromise()
      .then(res => {
        this.student = res.find(item => item.parents.some(elem => elem.id === this.authService.getId()))
      });
  }
}
