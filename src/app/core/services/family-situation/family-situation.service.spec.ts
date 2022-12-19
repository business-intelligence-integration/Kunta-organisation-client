import { TestBed } from '@angular/core/testing';

import { FamilySituationService } from './family-situation.service';

describe('FamilySituationService', () => {
  let service: FamilySituationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilySituationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
