import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreSubscriptionOfferComponent } from './view-more-subscription-offer.component';

describe('ViewMoreSubscriptionOfferComponent', () => {
  let component: ViewMoreSubscriptionOfferComponent;
  let fixture: ComponentFixture<ViewMoreSubscriptionOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreSubscriptionOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreSubscriptionOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
