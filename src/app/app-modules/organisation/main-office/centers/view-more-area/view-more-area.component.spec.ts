import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreAreaComponent } from './view-more-area.component';

describe('ViewMoreAreaComponent', () => {
  let component: ViewMoreAreaComponent;
  let fixture: ComponentFixture<ViewMoreAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
