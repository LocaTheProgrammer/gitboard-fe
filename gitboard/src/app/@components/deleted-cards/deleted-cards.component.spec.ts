import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedCardsComponent } from './deleted-cards.component';

describe('DeletedCardsComponent', () => {
  let component: DeletedCardsComponent;
  let fixture: ComponentFixture<DeletedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
