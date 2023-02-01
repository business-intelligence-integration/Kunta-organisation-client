import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualInvestmentComponent } from './mutual-investment.component';

describe('MutualInvestmentComponent', () => {
  let component: MutualInvestmentComponent;
  let fixture: ComponentFixture<MutualInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualInvestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutualInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
