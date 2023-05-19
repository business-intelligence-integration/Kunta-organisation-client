import { TestBed } from '@angular/core/testing';

import { ReceivingPartyService } from './receiving-party.service';

describe('ReceivingPartyService', () => {
  let service: ReceivingPartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivingPartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
