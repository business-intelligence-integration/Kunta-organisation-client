import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCycleComponent } from './detail-cycle.component';

describe('DetailCycleComponent', () => {
  let component: DetailCycleComponent;
  let fixture: ComponentFixture<DetailCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
