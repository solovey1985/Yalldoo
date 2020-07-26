import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-select-dropdown",
    templateUrl: "./select-dropdown.component.html",
    styleUrls: ["./select-dropdown.component.scss"]
})
export class SelectDropdownComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    items: string[];
    @Input()
    style: string;
    @Input()
    buttonIcon;
  @Input()
  withBorder: false;
    @Output()
    onItemSelected = new EventEmitter<string>();

    isSelected = false;
    public get buttonClass(): string {
        if (this.style) {
            return `btn-${this.style}`;
        }
        return this.isSelected ? "btn-success" : "btn-warning";
    }
  public get bordered(): boolean{
    return this.withBorder;
  }

    constructor() {}

    ngOnInit(): void {}

    onItemClick(item: string) {
        if (!this.style) {
            if (item) {
                this.isSelected = true;
                this.title = item;
            }
            this.onItemSelected.emit(item);
        }
    }
}
