import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEtudeListComponent } from './plan-etude-list.component';

describe('PlanEtudeListComponent', () => {
  let component: PlanEtudeListComponent;
  let fixture: ComponentFixture<PlanEtudeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanEtudeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEtudeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
