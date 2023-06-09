import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostMembersComponent } from './view-post-members.component';

describe('ViewPostMembersComponent', () => {
  let component: ViewPostMembersComponent;
  let fixture: ComponentFixture<ViewPostMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPostMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
