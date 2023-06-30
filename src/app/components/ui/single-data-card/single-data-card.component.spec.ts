import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDataCardComponent } from './single-data-card.component';

describe('SingleDataCardComponent', () => {
  let component: SingleDataCardComponent;
  let fixture: ComponentFixture<SingleDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDataCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
