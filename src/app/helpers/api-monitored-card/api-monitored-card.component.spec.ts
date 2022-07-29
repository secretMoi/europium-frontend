import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMonitoredCardComponent } from './api-monitored-card.component';

describe('ApiMonitoredCardComponent', () => {
  let component: ApiMonitoredCardComponent;
  let fixture: ComponentFixture<ApiMonitoredCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiMonitoredCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiMonitoredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
