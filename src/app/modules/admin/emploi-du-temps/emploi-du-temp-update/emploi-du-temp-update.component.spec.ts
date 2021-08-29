import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDuTempUpdateComponent } from './emploi-du-temp-update.component';

describe('EmploiDuTempUpdateComponent', () => {
  let component: EmploiDuTempUpdateComponent;
  let fixture: ComponentFixture<EmploiDuTempUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiDuTempUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiDuTempUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
