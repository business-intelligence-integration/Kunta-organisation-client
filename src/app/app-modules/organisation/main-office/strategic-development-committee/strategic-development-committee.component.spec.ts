import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicDevelopmentCommitteeComponent } from './strategic-development-committee.component';

describe('StrategicDevelopmentCommitteeComponent', () => {
  let component: StrategicDevelopmentCommitteeComponent;
  let fixture: ComponentFixture<StrategicDevelopmentCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicDevelopmentCommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicDevelopmentCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
