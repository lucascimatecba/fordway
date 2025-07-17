import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPrivComponent } from './header-priv.component';

describe('HeaderPrivComponent', () => {
  let component: HeaderPrivComponent;
  let fixture: ComponentFixture<HeaderPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
