import { TestBed } from '@angular/core/testing';

import { CivilityService } from './civility.service';

describe('CivilityService', () => {
  let service: CivilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CivilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
