import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';

describe('StudentPage', () => {
  let component: StudentPage;
  let fixture: ComponentFixture<StudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPage ],
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

    fixture = TestBed.createComponent(StudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
