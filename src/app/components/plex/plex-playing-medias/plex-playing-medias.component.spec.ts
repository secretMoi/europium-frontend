import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlexPlayingMediasComponent } from './plex-playing-medias.component';

describe('PlayingMediasComponent', () => {
  let component: PlexPlayingMediasComponent;
  let fixture: ComponentFixture<PlexPlayingMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlexPlayingMediasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlexPlayingMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
