import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailPaymentComponent } from './view-detail-payment.component';

describe('ViewDetailPaymentComponent', () => {
  let component: ViewDetailPaymentComponent;
  let fixture: ComponentFixture<ViewDetailPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
