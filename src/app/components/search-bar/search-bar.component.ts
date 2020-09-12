import { Component, OnInit, ChangeDetectionStrategy, Output, ViewChild, ElementRef, Input } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {

  @Input()
  placeholder: string;

  @Output()
  onChange: EventEmitter<string> = new EventEmitter<string>();


  searchInput: string;


  constructor() { }

  ngOnInit(): void {
  }

  onTextChange(): void {
    this.onChange.emit(this.searchInput);
  }
}
