import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPrivComponent } from './footer-priv.component';

describe('FooterPrivComponent', () => {
  let component: FooterPrivComponent;
  let fixture: ComponentFixture<FooterPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterPrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
