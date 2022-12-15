import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreDetailsSessionComponent } from './view-more-details-session.component';

describe('ViewMoreDetailsSessionComponent', () => {
  let component: ViewMoreDetailsSessionComponent;
  let fixture: ComponentFixture<ViewMoreDetailsSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreDetailsSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreDetailsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
