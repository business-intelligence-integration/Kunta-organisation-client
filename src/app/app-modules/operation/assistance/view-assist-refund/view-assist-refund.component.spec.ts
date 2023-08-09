import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssistRefundComponent } from './view-assist-refund.component';

describe('ViewAssistRefundComponent', () => {
  let component: ViewAssistRefundComponent;
  let fixture: ComponentFixture<ViewAssistRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssistRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssistRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
