import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMonitoringCommitteeComponent } from './production-monitoring-committee.component';

describe('ProductionMonitoringCommitteeComponent', () => {
  let component: ProductionMonitoringCommitteeComponent;
  let fixture: ComponentFixture<ProductionMonitoringCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMonitoringCommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMonitoringCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
