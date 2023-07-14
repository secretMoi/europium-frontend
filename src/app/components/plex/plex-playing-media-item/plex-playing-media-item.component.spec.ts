import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlexPlayingMediaItemComponent } from './plex-playing-media-item.component';

describe('PlexPlayingMediaItemComponent', () => {
  let component: PlexPlayingMediaItemComponent;
  let fixture: ComponentFixture<PlexPlayingMediaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlexPlayingMediaItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlexPlayingMediaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
