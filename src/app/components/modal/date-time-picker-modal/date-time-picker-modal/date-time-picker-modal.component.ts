import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-date-time-picker-modal',
  templateUrl: './date-time-picker-modal.component.html',
  styleUrls: ['./date-time-picker-modal.component.scss'],
  
})
export class DateTimePickerModalComponent implements OnInit {
  dateSelected = false;
  constructor() { }
  time = {hour: 13, minute: 30};
  ngOnInit(): void {
  }
  onDateSelected() {
    this.dateSelected = true;
  }

}
