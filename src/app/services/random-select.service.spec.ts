import { TestBed } from '@angular/core/testing';

import { RandomSelectService } from './random-select.service';

describe('RandomSelectService', () => {
  let service: RandomSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
