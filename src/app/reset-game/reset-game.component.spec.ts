import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetGameComponent } from './reset-game.component';

describe('ResetGameComponent', () => {
  let component: ResetGameComponent;
  let fixture: ComponentFixture<ResetGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
