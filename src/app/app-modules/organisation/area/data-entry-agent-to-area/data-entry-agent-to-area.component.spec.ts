import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryAgentToAreaComponent } from './data-entry-agent-to-area.component';

describe('DataEntryAgentToAreaComponent', () => {
  let component: DataEntryAgentToAreaComponent;
  let fixture: ComponentFixture<DataEntryAgentToAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryAgentToAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEntryAgentToAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
