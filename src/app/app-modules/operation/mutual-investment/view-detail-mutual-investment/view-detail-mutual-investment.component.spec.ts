import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailMutualInvestmentComponent } from './view-detail-mutual-investment.component';

describe('ViewDetailMutualInvestmentComponent', () => {
  let component: ViewDetailMutualInvestmentComponent;
  let fixture: ComponentFixture<ViewDetailMutualInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailMutualInvestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailMutualInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
