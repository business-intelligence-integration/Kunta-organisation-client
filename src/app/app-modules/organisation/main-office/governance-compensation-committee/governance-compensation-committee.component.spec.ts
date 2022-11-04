import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernanceCompensationCommitteeComponent } from './governance-compensation-committee.component';

describe('GovernanceCompensationCommitteeComponent', () => {
  let component: GovernanceCompensationCommitteeComponent;
  let fixture: ComponentFixture<GovernanceCompensationCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernanceCompensationCommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernanceCompensationCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
