import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaymentOfSessionComponent } from './all-payment-of-session.component';

describe('AllPaymentOfSessionComponent', () => {
  let component: AllPaymentOfSessionComponent;
  let fixture: ComponentFixture<AllPaymentOfSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaymentOfSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPaymentOfSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
