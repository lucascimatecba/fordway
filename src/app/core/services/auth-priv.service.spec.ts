import { TestBed } from '@angular/core/testing';

import { AuthPrivService } from './auth-priv.service';

describe('AuthPrivService', () => {
  let service: AuthPrivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPrivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
