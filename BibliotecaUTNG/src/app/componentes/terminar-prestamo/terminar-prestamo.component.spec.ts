import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminarPrestamoComponent } from './terminar-prestamo.component';

describe('TerminarPrestamoComponent', () => {
  let component: TerminarPrestamoComponent;
  let fixture: ComponentFixture<TerminarPrestamoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminarPrestamoComponent]
    });
    fixture = TestBed.createComponent(TerminarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
