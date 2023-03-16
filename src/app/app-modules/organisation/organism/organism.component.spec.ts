import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismComponent } from './organism.component';

describe('OrganismComponent', () => {
  let component: OrganismComponent;
  let fixture: ComponentFixture<OrganismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
