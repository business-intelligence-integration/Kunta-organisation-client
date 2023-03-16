import { TestBed } from '@angular/core/testing';

import { RefundTypeService } from './refund-type.service';

describe('RefundTypeService', () => {
  let service: RefundTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
