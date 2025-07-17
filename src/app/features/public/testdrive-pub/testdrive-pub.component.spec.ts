import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdrivePubComponent } from './testdrive-pub.component';

describe('TestdrivePubComponent', () => {
  let component: TestdrivePubComponent;
  let fixture: ComponentFixture<TestdrivePubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestdrivePubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestdrivePubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
