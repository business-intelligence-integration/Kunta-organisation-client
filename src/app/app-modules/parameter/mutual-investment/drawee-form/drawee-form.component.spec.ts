import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraweeFormComponent } from './drawee-form.component';

describe('DraweeFormComponent', () => {
  let component: DraweeFormComponent;
  let fixture: ComponentFixture<DraweeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraweeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraweeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
