import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsImportFacebookModalComponent } from './friends-import-facebook-modal.component';

describe('FriendsPickerModalComponent', () => {
  let component: FriendsImportFacebookModalComponent;
  let fixture: ComponentFixture<FriendsImportFacebookModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsImportFacebookModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsImportFacebookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
