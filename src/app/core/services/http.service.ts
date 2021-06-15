import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  static CONNECTION_REFUSE = 0;
  static UNAUTHORIZED = 401;
  static METHOD_ARGUMENT_NOT_VALID_EXCEPTION = 400;

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;
  private successfulNotification = undefined;
  private errorNotification = undefined;

  constructor(private http: HttpClient, private toastController: ToastController, private router: Router) {
    this.resetOptions();
  }

  param(key: string, value: string): HttpService {
    if (value != null) {
      this.params = this.params.append(key, value); // This class is immutable
    }
    return this;
  }

  paramsFrom(dto: any): HttpService {
    Object.getOwnPropertyNames(dto)
      .forEach(item => this.param(item, dto[item]));
    return this;
  }

  successful(notification = 'Successful'): HttpService {
    this.successfulNotification = notification;
    return this;
  }

  error(notification: string): HttpService {
    this.errorNotification = notification;
    return this;
  }

  pdf(): HttpService {
    this.responseType = 'blob';
    this.header('Accept', 'application/pdf , application/json');
    return this;
  }

  post(endpoint: string, body?: object): Observable<any> {
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  get(endpoint: string): Observable<any> {
    return this.http
      .get(endpoint, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  put(endpoint: string, body?: object): Observable<any> {
    return this.http
      .put(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  patch(endpoint: string, body?: object): Observable<any> {
    return this.http
      .patch(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  delete(endpoint: string): Observable<any> {
    return this.http
      .delete(endpoint, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error)));
  }

  authBearer(token): HttpService {
    return this.header('Authorization', 'Bearer ' + token);
  }

  header(key: string, value: string): HttpService {
    if (value != null) {
      this.headers = this.headers.append(key, value); // This class is immutable
    }
    return this;
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private async extractData(response): Promise<any> {
    if (this.successfulNotification) {
      const toast = await this.toastController.create({
        message: this.successfulNotification,
        duration: 2000,
        position: 'top',
      })
      toast.present();
      this.successfulNotification = undefined;
    }

    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/pdf') !== -1) {
        const blob = new Blob([response.body], {type: 'application/pdf'});
        window.open(window.URL.createObjectURL(blob));
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    } else {
      return response;
    }
  }

  private async showError(notification: string): Promise<void> {
    if (this.errorNotification) {
      const toast = await this.toastController.create({
        message: this.errorNotification,
        duration: 3000,
        color: 'danger',
        position: 'top',
      })
      toast.present();
      this.errorNotification = undefined;
    } else {
      const toast = await this.toastController.create({
        message: notification,
        duration: 3000,
        color: 'danger',
        position: 'top',
      })
      toast.present();
    }
  }

  private handleError(response): any {
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.showError('Unauthorized');
      this.router.navigate(['']).then();
      return EMPTY;
    } else if (response.status === HttpService.CONNECTION_REFUSE) {
      this.showError('Connection Refuse');
      return EMPTY;
    } else if (response.status === HttpService.METHOD_ARGUMENT_NOT_VALID_EXCEPTION) {
      this.showError('You must complete the required fields!');
      return EMPTY;
    } else {
      try {
        error = response.error; // with 'text': JSON.parse(response.error);
        this.showError(error.name + ' (' + response.status + '): ' + error.message);
        return throwError(error);
      } catch (e) {
        this.showError('Not response');
        return throwError(response.error);
      }
    }
  }
}
