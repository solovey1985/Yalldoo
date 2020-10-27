import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Self, ViewChild } from "@angular/core";
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import LocationDto from "app/_models/location.dto";
import { GeoService } from "app/_services/geo/geo.service";
import { Observable, from, of } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
    selector: "app-city-select",
    templateUrl: "./city-select.component.html",
    styleUrls: ["./city-select.component.scss"]
})
export class CitySelectComponent implements ControlValueAccessor {
    @Input()
    public required: boolean;
    @Input()
    public address: string;
    @Input()
    public title: string;
    @Output() setAddress: EventEmitter<LocationDto> = new EventEmitter();
    @ViewChild("addresstext") addresstext: ElementRef;

    autocompleteInput: string;
    queryWait: boolean;
    onTextChange$;
    suggestedAddress: LocationDto[];
    selectedAddress: LocationDto;
    constructor(@Self() public ngControl: NgControl, private geo: GeoService) {
        this.ngControl.valueAccessor = this;
    }

    writeValue(obj: any): void {
        
    }
    registerOnChange(fn: any): void {
      
    }
    registerOnTouched(fn: any): void {
       
    }
    setDisabledState?(isDisabled: boolean): void {
       
    }

    public get palceholder(): string {
        return this.title ?? "Start input your place";
    }

    public get isValid(): boolean {
        return this.required ? this.selectedAddress != null && this.selectedAddress != undefined : true;
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap((term) =>
                term.length < 2 ? [] : from(this.geo.citySuggest(term)).pipe(catchError(() => of([])))
            )
        );

    formatter = (input: LocationDto) => input.title;

    getPlaceAutocomplete = (query: string): Observable<LocationDto[]> => this.geo.autosuggest(query);

    onClear(input:any) {
        this.ngControl.control.patchValue(null);
    }

    onPlaceChanged($event: any, input: any) {
        $event.preventDefault();
        const p = this.geo.lookup($event.item.hereId).then((data) => {
            
            this.ngControl.control.patchValue(data);
        });
    }
}
