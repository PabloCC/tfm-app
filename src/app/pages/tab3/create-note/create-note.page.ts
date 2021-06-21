import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { EndPoints } from 'src/app/shared/end-points';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss'],
})
export class CreateNotePage implements OnInit {
  createNoteForm: FormGroup;
  classroom: any;
  targets: [];
  images: any[];

  isAdmin: boolean;
  isTeacher: boolean;
  isFamily: boolean;

  constructor(
    private httpService: HttpService, 
    private authService: AuthService, 
    private router: Router, ) {
      this.isAdmin = false;
      this.isTeacher = false;
      this.isFamily = false;
      this.createNoteForm = new FormGroup({
        target: new FormControl('', [
          Validators.required,
        ]),
        content: new FormControl('', [
          Validators.required,
        ])
      });
  }
  
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isTeacher = this.authService.isTeacher();
    this.isFamily = this.authService.isFamily();
    let endpoint = '';

    if(this.isAdmin) {
      this.router.navigate(['/tabs/tab1']);
      return;
    } else if(this.isTeacher) {
      endpoint = EndPoints.FAMILIES_ENDPOINT;
    } else if(this.isFamily) {
      endpoint = EndPoints.TEACHERS_ENDPOINT;
    }

    this.httpService.authBearer(this.authService.getToken())
      .get(endpoint)
      .toPromise()
      .then(res => {
        this.targets = res;
      });
  }

  onSubmit() {
    const body = {
      target: this.createNoteForm.get('target').value,
      content: this.createNoteForm.get('content').value,
      origin: this.authService.getUserWithoutToken(),
    }
    
    this.httpService.authBearer(this.authService.getToken())
      .successful('Nota enviada correctamente')
      .error('Error al enviar la nota')
      .post(EndPoints.NOTES_ENDPOINT, body)
      .toPromise()
      .then(() => {
        
      });
  }

}
