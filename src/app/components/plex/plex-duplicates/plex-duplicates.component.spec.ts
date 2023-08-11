import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlexDuplicatesComponent } from './plex-duplicates.component';

describe('PlexDuplicatesComponent', () => {
  let component: PlexDuplicatesComponent;
  let fixture: ComponentFixture<PlexDuplicatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlexDuplicatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlexDuplicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
