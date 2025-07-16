import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authPrivGuard } from './auth-priv.guard';

describe('authPrivGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authPrivGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
