import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitabilityTypeComponent } from './profitability-type.component';

describe('ProfitabilityTypeComponent', () => {
  let component: ProfitabilityTypeComponent;
  let fixture: ComponentFixture<ProfitabilityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitabilityTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitabilityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
