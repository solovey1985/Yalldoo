import { Component, OnInit, Input, Output,  EventEmitter } from "@angular/core";

@Component({
  selector: "app-privacy-selector",
  templateUrl: "./privacy-selector.component.html",
  styleUrls: ["./privacy-selector.component.css"]
})
export class PrivacySelectorComponent implements OnInit {

  @Input()
  buttonIcon = "eye"
  @Input()
    title = "Privacy"
  @Input()
  property: string;
  @Input()
  defaultValue = "Private";
  @Output()
  onPrivacySelected = new EventEmitter<any>();

  privacyItems = ["Private", "Friends", "Public"]

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item: string) {
    if (item) {
      this.title = item;
      this.onPrivacySelected.emit({ privacy: item, property: this.property });
    }
  }
}
