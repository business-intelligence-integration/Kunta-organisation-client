import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransversalityComponent } from './transversality.component';

describe('TransversalityComponent', () => {
  let component: TransversalityComponent;
  let fixture: ComponentFixture<TransversalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransversalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransversalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
