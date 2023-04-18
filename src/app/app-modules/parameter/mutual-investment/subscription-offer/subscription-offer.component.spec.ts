import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOfferComponent } from './subscription-offer.component';

describe('SubscriptionOfferComponent', () => {
  let component: SubscriptionOfferComponent;
  let fixture: ComponentFixture<SubscriptionOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
