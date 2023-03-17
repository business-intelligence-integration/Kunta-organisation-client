import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalityTypeComponent } from './penality-type.component';

describe('PenalityTypeComponent', () => {
  let component: PenalityTypeComponent;
  let fixture: ComponentFixture<PenalityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenalityTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenalityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
