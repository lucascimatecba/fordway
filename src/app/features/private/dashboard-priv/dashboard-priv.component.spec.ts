import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrivComponent } from './dashboard-priv.component';

describe('DashboardPrivComponent', () => {
  let component: DashboardPrivComponent;
  let fixture: ComponentFixture<DashboardPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
