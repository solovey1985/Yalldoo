import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import LocationDto from "app/_models/location.dto";
import { IHerePosition, IHereSearchResponse } from "app/_models/geo/address.model";
import { GeoService } from "app/_services/geo/geo.service";
import { Config } from "app/_configs/config";

@Component({
    selector: "app-location-picker-modal",
    templateUrl: "./location-picker-modal.component.html",
    styleUrls: ["./location-picker-modal.component.scss"]
})
export class LocationPickerModalComponent implements OnInit {
    @Output()
    onSubmit: EventEmitter<LocationDto> = new EventEmitter<LocationDto>();
    @Output()
    onDismiss = new EventEmitter();
    @Input()
    location: LocationDto;

    isEdit: boolean;
    currentPlace: IHereSearchResponse;

    constructor(private geo: GeoService) {}

    ngOnInit(): void {
        if (!this.location) {
            this.location = new LocationDto();
            this.location.title = "";
            this.location.position = {
                lat: Config.defaultLat,
                lng: Config.defaultLng
            };
        }
    }

    onOkayClick() {
        this.onSubmit.emit(this.location);
    }

    onCloseClick() {
        this.onDismiss.emit();
    }

    onSetAddress(place: LocationDto) {
      this.location = place;
    }

    onMapLocationSet(coord: IHerePosition) {
        this.geo.reverseGeocode(coord).then( (x: LocationDto) => {
            this.location = x
        });
    }
}
