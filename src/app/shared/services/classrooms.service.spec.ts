import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { ClassroomsService } from './classrooms.service';

describe('ClassroomsService', () => {
  let service: ClassroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [
        JwtHelperService,
      ]
    });
    service = TestBed.inject(ClassroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
