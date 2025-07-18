import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPrivComponent } from './sign-priv.component';

describe('SignPrivComponent', () => {
  let component: SignPrivComponent;
  let fixture: ComponentFixture<SignPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignPrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
