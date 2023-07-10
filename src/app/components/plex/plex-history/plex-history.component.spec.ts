import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlexHistoryComponent } from './plex-history.component';

describe('PlexHistoryComponent', () => {
  let component: PlexHistoryComponent;
  let fixture: ComponentFixture<PlexHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlexHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlexHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
