import { TestBed } from '@angular/core/testing';

import { AmountCollectedService } from './amount-collected.service';

describe('AmountCollectedService', () => {
  let service: AmountCollectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmountCollectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
