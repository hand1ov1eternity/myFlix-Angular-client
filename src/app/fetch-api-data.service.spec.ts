import { TestBed } from '@angular/core/testing';

import { UserRegistrationService } from './fetch-api-data.service'; // Update the import

describe('UserRegistrationService', () => { // Update the describe block
  let service: UserRegistrationService; // Update the service variable

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationService); // Update service injection
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

