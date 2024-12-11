import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaducaComponent } from './caduca.component';

describe('CaducaComponent', () => {
  let component: CaducaComponent;
  let fixture: ComponentFixture<CaducaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaducaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaducaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
