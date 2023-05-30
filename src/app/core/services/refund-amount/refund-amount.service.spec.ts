import { TestBed } from '@angular/core/testing';

import { RefundAmountService } from './refund-amount.service';

describe('RefundAmountService', () => {
  let service: RefundAmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundAmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
