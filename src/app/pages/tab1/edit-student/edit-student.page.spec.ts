import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';

import { EditStudentPage } from './edit-student.page';

describe('EditStudentPage', () => {
  let component: EditStudentPage;
  let fixture: ComponentFixture<EditStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentPage ],
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

    fixture = TestBed.createComponent(EditStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
