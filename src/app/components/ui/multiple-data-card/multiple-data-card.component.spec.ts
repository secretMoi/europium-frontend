import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDataCardComponent } from './multiple-data-card.component';

describe('MultipleDataCardComponent', () => {
  let component: MultipleDataCardComponent;
  let fixture: ComponentFixture<MultipleDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleDataCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
