import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosEjemplaresComponent } from './nuestros-ejemplares.component';

describe('NuestrosEjemplaresComponent', () => {
  let component: NuestrosEjemplaresComponent;
  let fixture: ComponentFixture<NuestrosEjemplaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestrosEjemplaresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuestrosEjemplaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
