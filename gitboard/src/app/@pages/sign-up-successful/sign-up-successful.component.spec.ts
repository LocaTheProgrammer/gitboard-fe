import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSuccessfulComponent } from './sign-up-successful.component';

describe('SignUpSuccessfulComponent', () => {
  let component: SignUpSuccessfulComponent;
  let fixture: ComponentFixture<SignUpSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
