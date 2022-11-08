import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationAgentToAreaComponent } from './communication-agent-to-area.component';

describe('CommunicationAgentToAreaComponent', () => {
  let component: CommunicationAgentToAreaComponent;
  let fixture: ComponentFixture<CommunicationAgentToAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationAgentToAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationAgentToAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
