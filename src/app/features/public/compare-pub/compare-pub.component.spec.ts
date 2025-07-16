import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePubComponent } from './compare-pub.component';

describe('ComparePubComponent', () => {
  let component: ComparePubComponent;
  let fixture: ComponentFixture<ComparePubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparePubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparePubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
