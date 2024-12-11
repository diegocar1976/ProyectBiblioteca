import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarLibroComponent } from './actualizar-libro.component';

describe('ActualizarLibroComponent', () => {
  let component: ActualizarLibroComponent;
  let fixture: ComponentFixture<ActualizarLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarLibroComponent]
    });
    fixture = TestBed.createComponent(ActualizarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
