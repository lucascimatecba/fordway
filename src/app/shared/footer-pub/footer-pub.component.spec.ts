import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPubComponent } from './footer-pub.component';

describe('FooterPubComponent', () => {
  let component: FooterPubComponent;
  let fixture: ComponentFixture<FooterPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterPubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
