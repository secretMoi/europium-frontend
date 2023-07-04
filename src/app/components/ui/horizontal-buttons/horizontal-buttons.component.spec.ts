import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalButtonsComponent } from './horizontal-buttons.component';

describe('HorizontalButtonsComponent', () => {
  let component: HorizontalButtonsComponent;
  let fixture: ComponentFixture<HorizontalButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
