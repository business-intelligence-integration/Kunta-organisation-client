import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceTypeComponent } from './piece-type.component';

describe('PieceTypeComponent', () => {
  let component: PieceTypeComponent;
  let fixture: ComponentFixture<PieceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
