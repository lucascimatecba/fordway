import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPrivComponent } from './clientes-priv.component';

describe('ClientesPrivComponent', () => {
  let component: ClientesPrivComponent;
  let fixture: ComponentFixture<ClientesPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesPrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
