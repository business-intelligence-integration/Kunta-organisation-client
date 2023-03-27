import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsOfMainOfficeComponent } from './posts-of-main-office.component';

describe('PostsOfMainOfficeComponent', () => {
  let component: PostsOfMainOfficeComponent;
  let fixture: ComponentFixture<PostsOfMainOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsOfMainOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsOfMainOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
