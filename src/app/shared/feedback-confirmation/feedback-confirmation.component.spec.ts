import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackConfirmationComponent } from './feedback-confirmation.component';

describe('FeedbackConfirmationComponent', () => {
  let component: FeedbackConfirmationComponent;
  let fixture: ComponentFixture<FeedbackConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
