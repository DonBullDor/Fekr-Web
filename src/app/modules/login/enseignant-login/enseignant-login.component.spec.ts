import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantLoginComponent } from './enseignant-login.component';

describe('EnseignantLoginComponent', () => {
  let component: EnseignantLoginComponent;
  let fixture: ComponentFixture<EnseignantLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
