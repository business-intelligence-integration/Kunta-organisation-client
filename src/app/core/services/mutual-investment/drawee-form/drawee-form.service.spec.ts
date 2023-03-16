import { TestBed } from '@angular/core/testing';

import { DraweeFormService } from './drawee-form.service';

describe('DraweeFormService', () => {
  let service: DraweeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraweeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
