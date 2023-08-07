import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YggSearchFiltersComponent } from './ygg-search-filters.component';

describe('SearchFiltersComponent', () => {
  let component: YggSearchFiltersComponent;
  let fixture: ComponentFixture<YggSearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YggSearchFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YggSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
