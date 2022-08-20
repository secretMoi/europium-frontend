import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentCardComponent } from './torrent-card.component';

describe('TorrentCardComponent', () => {
  let component: TorrentCardComponent;
  let fixture: ComponentFixture<TorrentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
