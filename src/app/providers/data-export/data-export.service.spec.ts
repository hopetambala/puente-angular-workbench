import { TestBed } from '@angular/core/testing';

import { DataExportService } from './data-export.service';

describe('DataExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataExportService = TestBed.get(DataExportService);
    expect(service).toBeTruthy();
  });
});
