import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsOfCentersComponent } from './posts-of-centers.component';

describe('PostsOfCentersComponent', () => {
  let component: PostsOfCentersComponent;
  let fixture: ComponentFixture<PostsOfCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsOfCentersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsOfCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
