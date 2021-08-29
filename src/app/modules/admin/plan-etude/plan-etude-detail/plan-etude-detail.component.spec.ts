import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEtudeDetailComponent } from './plan-etude-detail.component';

describe('PlanEtudeDetailComponent', () => {
  let component: PlanEtudeDetailComponent;
  let fixture: ComponentFixture<PlanEtudeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanEtudeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEtudeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
