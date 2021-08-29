import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantLoginComponent } from './etudiant-login.component';

describe('EtudiantLoginComponent', () => {
  let component: EtudiantLoginComponent;
  let fixture: ComponentFixture<EtudiantLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
