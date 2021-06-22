import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePublicationPage } from './create-publication.page';

describe('CreatePublicationPage', () => {
  let component: CreatePublicationPage;
  let fixture: ComponentFixture<CreatePublicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePublicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePublicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
