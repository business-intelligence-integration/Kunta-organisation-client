import { TestBed } from '@angular/core/testing';

import { MutualInvestmentService } from './mutual-investment.service';

describe('MutualInvestmentService', () => {
  let service: MutualInvestmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualInvestmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
