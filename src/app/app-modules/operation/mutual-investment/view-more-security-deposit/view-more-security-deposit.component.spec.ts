import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreSecurityDepositComponent } from './view-more-security-deposit.component';

describe('ViewMoreSecurityDepositComponent', () => {
  let component: ViewMoreSecurityDepositComponent;
  let fixture: ComponentFixture<ViewMoreSecurityDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreSecurityDepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreSecurityDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
