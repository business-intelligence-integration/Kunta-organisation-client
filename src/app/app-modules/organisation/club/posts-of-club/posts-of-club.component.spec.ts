import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsOfClubComponent } from './posts-of-club.component';

describe('PostsOfClubComponent', () => {
  let component: PostsOfClubComponent;
  let fixture: ComponentFixture<PostsOfClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsOfClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsOfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
