import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPosterHeaderComponent } from './media-poster-header.component';

describe('MediaPosterHeaderComponent', () => {
  let component: MediaPosterHeaderComponent;
  let fixture: ComponentFixture<MediaPosterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaPosterHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaPosterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
