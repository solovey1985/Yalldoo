import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FriendsPickerModalComponent } from "./friends-picker-modal.component";

describe("FriendsPickerModalComponent", () => {
  let component: FriendsPickerModalComponent;
  let fixture: ComponentFixture<FriendsPickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsPickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
