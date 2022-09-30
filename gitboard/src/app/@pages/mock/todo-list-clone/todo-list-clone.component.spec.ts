import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListCloneComponent } from './todo-list-clone.component';

describe('TodoListCloneComponent', () => {
  let component: TodoListCloneComponent;
  let fixture: ComponentFixture<TodoListCloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListCloneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
