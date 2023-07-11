import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlexHistoryItemComponent } from './plex-history-item.component';

describe('PlexHistoryItemComponent', () => {
  let component: PlexHistoryItemComponent;
  let fixture: ComponentFixture<PlexHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlexHistoryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlexHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
