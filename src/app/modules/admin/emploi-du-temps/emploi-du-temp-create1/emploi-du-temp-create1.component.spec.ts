import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDuTempCreate1Component } from './emploi-du-temp-create1.component';

describe('EmploiDuTempCreate1Component', () => {
  let component: EmploiDuTempCreate1Component;
  let fixture: ComponentFixture<EmploiDuTempCreate1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiDuTempCreate1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiDuTempCreate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
