import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePrivComponent } from './home-priv.component';

describe('HomePrivComponent', () => {
  let component: HomePrivComponent;
  let fixture: ComponentFixture<HomePrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
