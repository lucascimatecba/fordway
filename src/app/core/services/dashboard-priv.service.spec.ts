import { TestBed } from '@angular/core/testing';

import { DashboardPrivService } from './dashboard-priv.service';

describe('DashboardPrivService', () => {
  let service: DashboardPrivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPrivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
