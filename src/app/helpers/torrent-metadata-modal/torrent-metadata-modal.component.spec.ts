import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentMetadataModalComponent } from './torrent-metadata-modal.component';

describe('TorrentMetadataModalComponent', () => {
  let component: TorrentMetadataModalComponent;
  let fixture: ComponentFixture<TorrentMetadataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentMetadataModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentMetadataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
