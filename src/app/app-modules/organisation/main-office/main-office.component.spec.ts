import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOfficeComponent } from './main-office.component';

describe('MainOfficeComponent', () => {
  let component: MainOfficeComponent;
  let fixture: ComponentFixture<MainOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
