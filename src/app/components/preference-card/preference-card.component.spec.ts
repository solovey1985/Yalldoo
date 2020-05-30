import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceCardComponent } from './preference-card.component';

describe('PreferenceCardComponent', () => {
  let component: PreferenceCardComponent;
  let fixture: ComponentFixture<PreferenceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
