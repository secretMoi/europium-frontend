import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudApisComponent } from './crud-apis.component';

describe('CrudApisComponent', () => {
  let component: CrudApisComponent;
  let fixture: ComponentFixture<CrudApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudApisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
