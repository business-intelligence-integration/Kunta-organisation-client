import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentCommitteeComponent } from './development-committee.component';

describe('DevelopmentCommitteeComponent', () => {
  let component: DevelopmentCommitteeComponent;
  let fixture: ComponentFixture<DevelopmentCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentCommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
