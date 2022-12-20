import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilityComponent } from './civility.component';

describe('CivilityComponent', () => {
  let component: CivilityComponent;
  let fixture: ComponentFixture<CivilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CivilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
