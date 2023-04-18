import { TestBed } from '@angular/core/testing';

import { SubscriptionOfferService } from './subscription-offer.service';

describe('SubscriptionOfferService', () => {
  let service: SubscriptionOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
