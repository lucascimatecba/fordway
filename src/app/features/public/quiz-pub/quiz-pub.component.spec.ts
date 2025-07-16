import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPubComponent } from './quiz-pub.component';

describe('QuizPubComponent', () => {
  let component: QuizPubComponent;
  let fixture: ComponentFixture<QuizPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
