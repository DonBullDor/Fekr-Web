import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantDetailComponent } from './enseignant-detail.component';

describe('EnseignantDetailComponent', () => {
  let component: EnseignantDetailComponent;
  let fixture: ComponentFixture<EnseignantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseignantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
