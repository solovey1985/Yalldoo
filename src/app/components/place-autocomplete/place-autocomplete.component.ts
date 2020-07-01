import { Component, OnInit, Output, Input, ViewChild, EventEmitter, AfterViewInit, ElementRef } from "@angular/core";
import { fromEvent, Observable, of, from } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

import LocationDto from "app/_models/location.dto";
import { GeoService } from "app/_services/geo/geo.service";
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, mergeMap } from "rxjs/operators";
import { map } from "rxjs-compat/operator/map";

@Component({
    selector: "app-place-autocomplete",
    templateUrl: "./places-autocomplete.component.html",
    styleUrls: ["./place-autocomplete.component.scss"]
})
export class PlaceAutocompleteComponent implements OnInit {
    @Input()
    public address: string;
    @Output() setAddress: EventEmitter<LocationDto> = new EventEmitter();
    @ViewChild("addresstext") addresstext: ElementRef;

    autocompleteInput: string;
    queryWait: boolean;
    onTextChange$;
    suggestedAddress: LocationDto[];
    selectedAddress: LocationDto;
    constructor(private geo: GeoService) {}

    ngOnInit() {}

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap((term) =>
                term.length < 2
                    ? []
                    : from(this.geo.autosuggest(term)).pipe(
                          catchError(() => of([]))
                      )
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
        let p = this.geo.lookup($event.item.hereId).then(data => {
            this.setAddress.emit(data);
            input.value = "";
        });
        
    }
}
