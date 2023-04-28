import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailSubscriptionComponent } from './view-detail-subscription.component';

describe('ViewDetailSubscriptionComponent', () => {
  let component: ViewDetailSubscriptionComponent;
  let fixture: ComponentFixture<ViewDetailSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
