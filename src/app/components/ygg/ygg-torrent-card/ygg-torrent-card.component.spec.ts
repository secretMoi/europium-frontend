import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YggTorrentCardComponent } from './ygg-torrent-card.component';

describe('YggTorrentCardComponent', () => {
  let component: YggTorrentCardComponent;
  let fixture: ComponentFixture<YggTorrentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YggTorrentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YggTorrentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
