import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsTontineComponent } from './view-details-tontine.component';

describe('ViewDetailsTontineComponent', () => {
  let component: ViewDetailsTontineComponent;
  let fixture: ComponentFixture<ViewDetailsTontineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailsTontineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailsTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
