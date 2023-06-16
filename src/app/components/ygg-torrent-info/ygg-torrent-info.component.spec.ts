import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YggTorrentInfoComponent } from './ygg-torrent-info.component';

describe('YggTorrentInfoComponent', () => {
  let component: YggTorrentInfoComponent;
  let fixture: ComponentFixture<YggTorrentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YggTorrentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YggTorrentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
