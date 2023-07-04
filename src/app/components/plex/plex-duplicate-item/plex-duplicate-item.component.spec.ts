import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlexDuplicateItemComponent } from './plex-duplicate-item.component';

describe('PlexDuplicateItemComponent', () => {
  let component: PlexDuplicateItemComponent;
  let fixture: ComponentFixture<PlexDuplicateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlexDuplicateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlexDuplicateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
