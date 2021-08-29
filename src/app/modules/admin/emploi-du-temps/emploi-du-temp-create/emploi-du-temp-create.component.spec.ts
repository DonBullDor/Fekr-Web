import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDuTempCreateComponent } from './emploi-du-temp-create.component';

describe('EmploiDuTempCreateComponent', () => {
  let component: EmploiDuTempCreateComponent;
  let fixture: ComponentFixture<EmploiDuTempCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiDuTempCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiDuTempCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
