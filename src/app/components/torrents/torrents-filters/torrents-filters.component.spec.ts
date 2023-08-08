import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentsFiltersComponent } from './torrents-filters.component';

describe('TorrentsFiltersComponent', () => {
  let component: TorrentsFiltersComponent;
  let fixture: ComponentFixture<TorrentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
