import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingMediasComponent } from './playing-medias.component';

describe('PlayingMediasComponent', () => {
  let component: PlayingMediasComponent;
  let fixture: ComponentFixture<PlayingMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayingMediasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
