import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreParticipantComponent } from './view-more-participant.component';

describe('ViewMoreParticipantComponent', () => {
  let component: ViewMoreParticipantComponent;
  let fixture: ComponentFixture<ViewMoreParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
