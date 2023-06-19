import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YggSearchComponent } from './ygg-search.component';

describe('YggSearchComponent', () => {
  let component: YggSearchComponent;
  let fixture: ComponentFixture<YggSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YggSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YggSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
