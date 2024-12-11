import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPrestamoComponent } from './alta-prestamo.component';

describe('AltaPrestamoComponent', () => {
  let component: AltaPrestamoComponent;
  let fixture: ComponentFixture<AltaPrestamoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaPrestamoComponent]
    });
    fixture = TestBed.createComponent(AltaPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
