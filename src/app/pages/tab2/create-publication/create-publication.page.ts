import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.page.html',
  styleUrls: ['./create-publication.page.scss'],
})
export class CreatePublicationPage implements OnInit {
  createPublicationForm: FormGroup;
  
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.createPublicationForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      content: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const body = {
      title: this.createPublicationForm.get('title').value,
      content: this.createPublicationForm.get('content').value,
    }

    this.httpService.authBearer(this.authService.getToken())
      .successful('Anuncio creado correctamente')
      .error('Error al crear el Anuncio')
      .post(EndPoints.PUBLICATIONS_ENDPOINT, body)
      .toPromise()
      .then(() => {
        this.router.navigate(['/tabs/tab2']);
      });
  }

}
