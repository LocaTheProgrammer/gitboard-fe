import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNDropColoneComponent } from './drag-n-drop-colone.component';

describe('DragNDropColoneComponent', () => {
  let component: DragNDropColoneComponent;
  let fixture: ComponentFixture<DragNDropColoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragNDropColoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragNDropColoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
