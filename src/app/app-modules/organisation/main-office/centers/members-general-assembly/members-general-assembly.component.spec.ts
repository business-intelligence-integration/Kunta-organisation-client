import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersGeneralAssemblyComponent } from './members-general-assembly.component';

describe('MembersGeneralAssemblyComponent', () => {
  let component: MembersGeneralAssemblyComponent;
  let fixture: ComponentFixture<MembersGeneralAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersGeneralAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersGeneralAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
