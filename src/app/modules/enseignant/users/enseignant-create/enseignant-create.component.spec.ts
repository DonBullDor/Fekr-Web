import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantCreateComponent } from './enseignant-create.component';

describe('EnseignantCreateComponent', () => {
  let component: EnseignantCreateComponent;
  let fixture: ComponentFixture<EnseignantCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
