import { TestBed } from '@angular/core/testing';

import { IdSelectionService } from './id-selection.service';

describe('IdSelectionService', () => {
  let service: IdSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
