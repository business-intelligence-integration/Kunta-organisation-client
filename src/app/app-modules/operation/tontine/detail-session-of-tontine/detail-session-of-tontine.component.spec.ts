import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSessionOfTontineComponent } from './detail-session-of-tontine.component';

describe('DetailSessionOfTontineComponent', () => {
  let component: DetailSessionOfTontineComponent;
  let fixture: ComponentFixture<DetailSessionOfTontineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSessionOfTontineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSessionOfTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
