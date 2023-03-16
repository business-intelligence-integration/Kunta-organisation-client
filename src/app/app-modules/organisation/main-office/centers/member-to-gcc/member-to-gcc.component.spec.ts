import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberToGccComponent } from './member-to-gcc.component';

describe('MemberToGccComponent', () => {
  let component: MemberToGccComponent;
  let fixture: ComponentFixture<MemberToGccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberToGccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberToGccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
