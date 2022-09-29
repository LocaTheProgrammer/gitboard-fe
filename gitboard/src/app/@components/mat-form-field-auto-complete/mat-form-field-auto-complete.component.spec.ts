import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldAutoCompleteComponent } from './mat-form-field-auto-complete.component';

describe('MatFormFieldAutoCompleteComponent', () => {
  let component: MatFormFieldAutoCompleteComponent;
  let fixture: ComponentFixture<MatFormFieldAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatFormFieldAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormFieldAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
