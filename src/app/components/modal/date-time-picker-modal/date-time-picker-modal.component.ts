import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { DateTimeModel, NgbDateTimeStruct } from "app/components/date-time-picker/date-time.model";
import { NgbDatepicker, NgbTimepicker, NgbPopover, NgbTimeStruct, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { noop } from "rxjs";
import { NgbDateStructAdapter } from "@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter";
import { IfStmt } from "@angular/compiler";

@Component({
    selector: "app-date-time-picker-modal",
    templateUrl: "./date-time-picker-modal.component.html",
    styleUrls: ["./date-time-picker-modal.component.scss"]
})
export class DateTimePickerModalComponent implements OnInit {
    dateSelected = false;
    @Input()
    dateString: string;
    @Input()
    disabled = false;

    @Output()
    onSubmit: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    onDismiss: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild("dp")
    public set dp(content: NgbDatepicker) {
        if (content) {
            this.datePicker = content;
            this.datePicker.navigateTo({ year: this.date.year, month: this.date.month });
        }
    }

    private datePicker: NgbDatepicker;

    @ViewChild("timePicker", { static: false })
    public timePicker: NgbTimepicker;
    
    showTimePickerToggle = false;
    onTouched: () => void = noop;
    onChange: (_: any) => void = noop;
    date: DateTimeModel;
    time: DateTimeModel;

    firstTimeAssign = true;
    constructor() {}

    ngOnInit(): void {
        this.date = DateTimeModel.fromLocalString(this.dateString);
        this.time = DateTimeModel.fromLocalString(this.dateString);
    }

    onDateSelected() {
        this.dateSelected = true;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    toggleDateTimeState($event: any) {
        this.showTimePickerToggle = !this.showTimePickerToggle;
        $event.stopPropagation();
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
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

        if (!this.date) {
            this.date = date;
        }

        this.date.year = date.year;
        this.date.month = date.month;
        this.date.day = date.day;
        this.datePicker.navigateTo({ year: this.date.year, month: this.date.month });
        this.setDateStringModel();
        this.toggleDateTimeState(new MouseEvent(""));
    }

    onTimeChange($event: NgbDateTimeStruct) {
        if ($event) {
            this.date.hour = $event.hour;
            this.date.minute = $event.minute;
            this.date.second = $event.second;
            this.setDateStringModel();
        }
    }

    setDateStringModel() {
        let localDate = new DateTimeModel();
        let localString;
        if (this.date) {
            localString = `${this.date.year}-${this.date.month}-${this.date.day}`;
        }
        if (this.time) {
            localString += ` ${this.time.hour}:${this.time.minute}:${this.time.second}`;
        }
        localDate = DateTimeModel.fromLocalString(localString);

        this.dateString = localDate.toString();

        if (!this.firstTimeAssign) {
            this.onChange(this.dateString);
        } else {
            if (this.dateString !== null) {
                this.firstTimeAssign = false;
            }
        }
    }

    onOkayClick() {
        this.onSubmit.emit(this.dateString);
    }

    onCloseClick() {
        this.onDismiss.emit();
    }
}
