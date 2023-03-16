import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsGeneralAssemblyComponent } from './clubs-general-assembly.component';

describe('ClubsGeneralAssemblyComponent', () => {
  let component: ClubsGeneralAssemblyComponent;
  let fixture: ComponentFixture<ClubsGeneralAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubsGeneralAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsGeneralAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
