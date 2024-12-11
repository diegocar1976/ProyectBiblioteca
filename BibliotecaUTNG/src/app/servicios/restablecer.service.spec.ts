import { TestBed } from '@angular/core/testing';

import { RestablecerService } from './restablecer.service';

describe('RestablecerService', () => {
  let service: RestablecerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestablecerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
