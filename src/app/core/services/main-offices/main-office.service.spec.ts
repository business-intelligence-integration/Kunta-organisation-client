import { TestBed } from '@angular/core/testing';

import { MainOfficeService } from './main-office.service';

describe('MainOfficeService', () => {
  let service: MainOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
