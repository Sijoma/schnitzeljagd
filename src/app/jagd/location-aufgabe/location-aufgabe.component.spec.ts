import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAufgabeComponent } from './location-aufgabe.component';

describe('LocationAufgabeComponent', () => {
  let component: LocationAufgabeComponent;
  let fixture: ComponentFixture<LocationAufgabeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAufgabeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAufgabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
