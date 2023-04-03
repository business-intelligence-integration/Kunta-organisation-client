import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsRoleComponent } from './user-details-role.component';

describe('UserDetailsRoleComponent', () => {
  let component: UserDetailsRoleComponent;
  let fixture: ComponentFixture<UserDetailsRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
