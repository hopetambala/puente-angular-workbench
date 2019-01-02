import { TestBed } from '@angular/core/testing';

import { QueryCustomService } from './query-custom.service';

describe('QueryCustomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryCustomService = TestBed.get(QueryCustomService);
    expect(service).toBeTruthy();
  });
});
