import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEjemplaresComponent } from './gestion-ejemplares.component';

describe('GestionEjemplaresComponent', () => {
  let component: GestionEjemplaresComponent;
  let fixture: ComponentFixture<GestionEjemplaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEjemplaresComponent]
    });
    fixture = TestBed.createComponent(GestionEjemplaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});