import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreAreClubComponent } from './view-more-are-club.component';

describe('ViewMoreAreClubComponent', () => {
  let component: ViewMoreAreClubComponent;
  let fixture: ComponentFixture<ViewMoreAreClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreAreClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreAreClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
