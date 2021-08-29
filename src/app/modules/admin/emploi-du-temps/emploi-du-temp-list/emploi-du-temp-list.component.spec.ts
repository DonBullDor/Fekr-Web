import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiDuTempListComponent } from './emploi-du-temp-list.component';

describe('EmploiDuTempListComponent', () => {
  let component: EmploiDuTempListComponent;
  let fixture: ComponentFixture<EmploiDuTempListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiDuTempListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiDuTempListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
