import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPrivComponent } from './login-priv.component';

describe('LoginPrivComponent', () => {
  let component: LoginPrivComponent;
  let fixture: ComponentFixture<LoginPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
