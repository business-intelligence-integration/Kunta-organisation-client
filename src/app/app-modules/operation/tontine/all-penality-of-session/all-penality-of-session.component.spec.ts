import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPenalityOfSessionComponent } from './all-penality-of-session.component';

describe('AllPenalityOfSessionComponent', () => {
  let component: AllPenalityOfSessionComponent;
  let fixture: ComponentFixture<AllPenalityOfSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPenalityOfSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPenalityOfSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
