import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAssemblyComponent } from './general-assembly.component';

describe('GeneralAssemblyComponent', () => {
  let component: GeneralAssemblyComponent;
  let fixture: ComponentFixture<GeneralAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
