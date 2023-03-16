import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMorePostComponent } from './view-more-post.component';

describe('ViewMorePostComponent', () => {
  let component: ViewMorePostComponent;
  let fixture: ComponentFixture<ViewMorePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMorePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMorePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
