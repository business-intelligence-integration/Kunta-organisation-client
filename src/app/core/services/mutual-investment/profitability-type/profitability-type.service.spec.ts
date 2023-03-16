import { TestBed } from '@angular/core/testing';

import { ProfitabilityTypeService } from './profitability-type.service';

describe('ProfitabilityTypeService', () => {
  let service: ProfitabilityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfitabilityTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
