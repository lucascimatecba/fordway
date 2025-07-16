import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginPrivGuard } from './login-priv.guard';

describe('loginPrivGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginPrivGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
