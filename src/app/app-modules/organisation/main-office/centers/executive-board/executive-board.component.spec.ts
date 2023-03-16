import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveBoardComponent } from './executive-board.component';

describe('ExecutiveBoardComponent', () => {
  let component: ExecutiveBoardComponent;
  let fixture: ComponentFixture<ExecutiveBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutiveBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
