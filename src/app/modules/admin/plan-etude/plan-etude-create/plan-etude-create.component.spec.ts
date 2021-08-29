import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEtudeCreateComponent } from './plan-etude-create.component';

describe('PlanEtudeCreateComponent', () => {
  let component: PlanEtudeCreateComponent;
  let fixture: ComponentFixture<PlanEtudeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanEtudeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEtudeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
