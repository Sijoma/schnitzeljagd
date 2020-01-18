import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JagdComponent } from './jagd.component';

describe('JagdComponent', () => {
  let component: JagdComponent;
  let fixture: ComponentFixture<JagdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JagdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JagdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
