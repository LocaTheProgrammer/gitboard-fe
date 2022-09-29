import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserToProjectComponent } from './assign-user-to-project.component';

describe('AssignUserToProjectComponent', () => {
  let component: AssignUserToProjectComponent;
  let fixture: ComponentFixture<AssignUserToProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignUserToProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUserToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
