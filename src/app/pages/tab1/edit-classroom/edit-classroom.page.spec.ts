import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditClassroomPage } from './edit-classroom.page';

describe('EditClassroomPage', () => {
  let component: EditClassroomPage;
  let fixture: ComponentFixture<EditClassroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClassroomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditClassroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
