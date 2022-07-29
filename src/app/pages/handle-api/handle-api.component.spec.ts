import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HandleApiComponent} from './handle-api.component';

describe('HandleApiComponent', () => {
  let component: HandleApiComponent;
  let fixture: ComponentFixture<HandleApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
