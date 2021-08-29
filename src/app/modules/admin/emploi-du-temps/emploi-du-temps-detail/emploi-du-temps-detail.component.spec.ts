import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDuTempsDetailComponent } from './emploi-du-temps-detail.component';

describe('EmploiDuTempsDetailComponent', () => {
  let component: EmploiDuTempsDetailComponent;
  let fixture: ComponentFixture<EmploiDuTempsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiDuTempsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiDuTempsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
