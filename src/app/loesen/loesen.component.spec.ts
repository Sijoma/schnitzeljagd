import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoesenComponent } from './loesen.component';

describe('LoesenComponent', () => {
  let component: LoesenComponent;
  let fixture: ComponentFixture<LoesenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoesenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoesenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
