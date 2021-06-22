import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';

import { CreatePublicationPage } from './create-publication.page';

describe('CreatePublicationPage', () => {
  let component: CreatePublicationPage;
  let fixture: ComponentFixture<CreatePublicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePublicationPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule, 
        RouterTestingModule,
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
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePublicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
