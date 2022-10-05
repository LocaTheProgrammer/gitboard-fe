import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskListComponent } from './delete-task-list.component';

describe('DeleteTaskListComponent', () => {
  let component: DeleteTaskListComponent;
  let fixture: ComponentFixture<DeleteTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
