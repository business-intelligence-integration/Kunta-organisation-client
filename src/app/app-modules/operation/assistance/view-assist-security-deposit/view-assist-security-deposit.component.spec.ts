import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssistSecurityDepositComponent } from './view-assist-security-deposit.component';

describe('ViewAssistSecurityDepositComponent', () => {
  let component: ViewAssistSecurityDepositComponent;
  let fixture: ComponentFixture<ViewAssistSecurityDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssistSecurityDepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssistSecurityDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
