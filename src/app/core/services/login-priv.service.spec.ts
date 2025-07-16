import { TestBed } from '@angular/core/testing';

import { LoginPrivService } from './login-priv.service';

describe('LoginPrivService', () => {
  let service: LoginPrivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPrivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
