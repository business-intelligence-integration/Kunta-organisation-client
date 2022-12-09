import { TestBed } from '@angular/core/testing';

import { PenaltyTypeService } from './penalty-type.service';

describe('PenaltyTypeService', () => {
  let service: PenaltyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenaltyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
