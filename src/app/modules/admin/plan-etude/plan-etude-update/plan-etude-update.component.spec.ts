import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEtudeUpdateComponent } from './plan-etude-update.component';

describe('PlanEtudeUpdateComponent', () => {
  let component: PlanEtudeUpdateComponent;
  let fixture: ComponentFixture<PlanEtudeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanEtudeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEtudeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
