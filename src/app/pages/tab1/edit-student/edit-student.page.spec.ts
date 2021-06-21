import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditStudentPage } from './edit-student.page';

describe('EditStudentPage', () => {
  let component: EditStudentPage;
  let fixture: ComponentFixture<EditStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
