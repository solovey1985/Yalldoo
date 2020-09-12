import { Component, OnInit, Input, forwardRef, ViewChild, AfterViewInit, Injector, Optional, ViewEncapsulation } from "@angular/core";
import { NgbTimeStruct, NgbDateStruct, NgbPopoverConfig, NgbPopover, NgbDatepicker, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { DateTimeModel } from "./date-time.model";
import { noop } from "rxjs";

@Component({
    selector: "app-date-time-picker",
    templateUrl: "./date-time-picker.component.html",
    styleUrls: ["./date-time-picker.component.scss"],
    providers: [
        DatePipe,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateTimePickerComponent),
            multi: true
        }
    ]
})
export class DateTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {
    @Input()
    dateString: string;

    @Input()
    inputDatetimeFormat = "HH:mm dd MMMM yyyy";
    @Input()
    hourStep = 1;
    @Input()
    minuteStep = 15;
    @Input()
    secondStep = 30;
    @Input()
    seconds = true;

    @Input()
    disabled = false;

    showTimePickerToggle = false;

    public datetime: DateTimeModel = new DateTimeModel();
    firstTimeAssign = true;

    @ViewChild(NgbDatepicker)
    public datePicker: NgbDatepicker;

    @ViewChild(NgbTimepicker)
    public timePicker: NgbTimepicker;


    onTouched: () => void = noop;
    onChange: (_: any) => void = noop;


    constructor(private config: NgbPopoverConfig) {
        config.autoClose = "outside";
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {


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

    toggleDateTimeState($event: any) {
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
}
