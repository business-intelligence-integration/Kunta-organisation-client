import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailAssistanceComponent } from './view-detail-assistance.component';

describe('ViewDetailAssistanceComponent', () => {
  let component: ViewDetailAssistanceComponent;
  let fixture: ComponentFixture<ViewDetailAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailAssistanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
