import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailRefundComponent } from './view-detail-refund.component';

describe('ViewDetailRefundComponent', () => {
  let component: ViewDetailRefundComponent;
  let fixture: ComponentFixture<ViewDetailRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
