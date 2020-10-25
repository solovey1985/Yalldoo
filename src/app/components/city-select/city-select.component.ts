import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import LocationDto from "app/_models/location.dto";
import { GeoService } from "app/_services/geo/geo.service";
import { Observable, from, of } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
    selector: "app-city-select",
    templateUrl: "./city-select.component.html",
    styleUrls: ["./city-select.component.scss"]
})
export class CitySelectComponent implements OnInit {
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
    constructor(private geo: GeoService) {}

  ngOnInit(): void { }
  
  
  public get palceholder() : string {
    return this.title ?? "Start input your place";
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

    onClear() {
        this.autocompleteInput = "";
    }

    invokeEvent(place: LocationDto) {
        this.setAddress.emit(place);
    }

    onPlaceChanged($event: any, input: any) {
        $event.preventDefault();
        const p = this.geo.lookup($event.item.hereId).then((data) => {
            this.setAddress.emit(data);
            input.value = data.title;
        });
    }
}
