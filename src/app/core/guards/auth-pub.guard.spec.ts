import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authPubGuard } from './auth-pub.guard';

describe('authPubGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authPubGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
