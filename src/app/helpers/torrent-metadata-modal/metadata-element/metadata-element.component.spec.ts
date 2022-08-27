import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataElementComponent } from './metadata-element.component';

describe('MetadataElementComponent', () => {
  let component: MetadataElementComponent;
  let fixture: ComponentFixture<MetadataElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetadataElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
