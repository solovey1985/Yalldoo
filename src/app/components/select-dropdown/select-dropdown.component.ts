import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  items: string[];
  @Output()
  onItemSelected = new EventEmitter<string>();

  isSelected = false;

  constructor() { }

  ngOnInit(): void {
  }
  onItemClick(item:string){
    if(item){
      this.isSelected = true;
      this.title = item;
    }
    this.onItemSelected.emit(item);
  }
}
