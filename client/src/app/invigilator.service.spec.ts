import { TestBed, inject } from '@angular/core/testing';

import { InvigilatorService } from './invigilator.service';

describe('InvigilatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvigilatorService]
    });
  });

  it('should be created', inject([InvigilatorService], (service: InvigilatorService) => {
    expect(service).toBeTruthy();
  }));
});
