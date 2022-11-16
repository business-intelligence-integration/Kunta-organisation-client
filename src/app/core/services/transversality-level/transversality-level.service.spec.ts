import { TestBed } from '@angular/core/testing';

import { TransversalityLevelService } from './transversality-level.service';

describe('TransversalityLevelService', () => {
  let service: TransversalityLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransversalityLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
