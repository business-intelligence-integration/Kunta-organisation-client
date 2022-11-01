import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutulistComponent } from './mutulist.component';

describe('MutulistComponent', () => {
  let component: MutulistComponent;
  let fixture: ComponentFixture<MutulistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutulistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
