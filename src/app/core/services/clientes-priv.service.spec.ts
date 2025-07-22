import { TestBed } from '@angular/core/testing';

import { ClientesPrivService } from './clientes-priv.service';

describe('ClientesPrivService', () => {
  let service: ClientesPrivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesPrivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
