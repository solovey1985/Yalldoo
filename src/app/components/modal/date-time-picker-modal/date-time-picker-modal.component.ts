import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DateTimeModel } from 'app/components/date-time-picker/date-time.model';
import { NgbDatepicker, NgbTimepicker, NgbPopover, NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';

@Component({
  selector: 'app-date-time-picker-modal',
  templateUrl: './date-time-picker-modal.component.html',
  styleUrls: ['./date-time-picker-modal.component.scss'],
  
})
export class DateTimePickerModalComponent implements OnInit {
  dateSelected = false;
  @Input()
  dateString: string;
  @Input()
  disabled = false;
  
  @Output()
  onSubmit: EventEmitter<NgbDateStruct> = new EventEmitter<NgbDateStruct>();
  @Output()
  onDismiss: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(NgbDatepicker)
  public dp: NgbDatepicker;
  datetime: DateTimeModel = new DateTimeModel();
  firstTimeAssign = true;
  time = {hour: 13, minute: 30};

  @ViewChild(NgbTimepicker)
  public timePicker: NgbTimepicker;

  showTimePickerToggle = false;
  onTouched: () => void = noop;
     onChange: (_: any) => void = noop;


  constructor() { }
  
  ngOnInit(): void {
  }
  
  onDateSelected() {
    this.dateSelected = true;
  }

  writeValue(newModel: string) {
    if (newModel) {
        this.datetime = Object.assign(this.datetime, DateTimeModel.fromLocalString(newModel));
        this.dateString = newModel;
        this.setDateStringModel();
    } else {
        this.datetime = new DateTimeModel();
    }
}

registerOnChange(fn: any): void {
    this.onChange = fn;
}

registerOnTouched(fn: any): void {
this.onTouched = fn;
}

toggleDateTimeState($event:any) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
}

setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
}

onInputChange($event: any) {
    const value = $event.target.value;
    const dt = DateTimeModel.fromLocalString(value);

    if (dt) {
        this.datetime = dt;
        this.setDateStringModel();
    } else if (value.trim() === "") {
        this.datetime = new DateTimeModel();
        this.dateString = "";
        this.onChange(this.dateString);
    } else {
        this.onChange(value);
    }
}

onDateChange($event: any) {
    let dd;
    if ($event.year) {
        dd = `${$event.year}-${$event.month}-${$event.day}`;
    }

    const date = DateTimeModel.fromLocalString(dd);

    if (!date) {
        this.dateString = this.dateString;
        return;
    }

    if (!this.datetime) {
        this.datetime = date;
    }

    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;

   // this.dp.navigateTo({ year: this.datetime.year, month: this.datetime.month });

    this.setDateStringModel();
    this.toggleDateTimeState(new MouseEvent(""));
  }

onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;

    this.setDateStringModel();
}

setDateStringModel() {
    this.dateString = this.datetime.toString();

    if (!this.firstTimeAssign) {
        this.onChange(this.dateString);
    } else {
        // Skip very first assignment to null done by Angular
        if (this.dateString !== null) {
            this.firstTimeAssign = false;
        }
    }
}

inputBlur($event) {
    this.onTouched();
}
  onOkayClick() {
    this.onSubmit.emit(this.datetime);
  }
  
  onCloseClick() {
    this.onDismiss.emit();
   }


}
