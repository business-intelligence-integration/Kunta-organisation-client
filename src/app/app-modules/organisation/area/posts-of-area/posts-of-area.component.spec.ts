import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsOfAreaComponent } from './posts-of-area.component';

describe('PostsOfAreaComponent', () => {
  let component: PostsOfAreaComponent;
  let fixture: ComponentFixture<PostsOfAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsOfAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsOfAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
