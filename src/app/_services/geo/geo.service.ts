import { Injectable } from "@angular/core";
import { Config } from "../../_configs/config";

import { Observable, of } from "rxjs";
import { IHerePosition, AddressModel, IHereSearchResponse } from "app/_models/geo/address.model";
import LocationDto from "app/_models/location.dto";
import { map } from "rxjs/operators";
declare var H: any;

@Injectable({ providedIn: "root" })
export class GeoService {
    platform: any;
    searchService: any;
    center: string;

    constructor() {
        this.platform = new H.service.Platform({
            apikey: Config.geoApiKey
        });
        this.searchService = this.platform.getSearchService();
        this.setSearchCenter();
    }

    public autosuggest(query: string): any {
        return this.searchService
            .autosuggest({ q: query, at: this.center, limit: 7, resultTypes: "categoryQuery,place,street,houseNumber" }, (result: AddressModel) => result.items, alert)
            .then((data) => {
                return data.items.map((h) => this.toLocationDto(h));
            });
    }

    public lookup(hereId: string): any {
        return this.searchService
        .lookup({ id: hereId, }, (result: IHereSearchResponse) => result, alert)
        .then((data) => {
            return this.toLocationDto(data);
        });
    }

    reverseGeocode(coord: IHerePosition) {
        return this.searchService
            .reverseGeocode(
                {
                    at: `${coord.lat},${coord.lng}`
                },
                (result) => {
                    return result.items[0];
                },
                (err) => {
                    console.log(err);
                }
            )
            .then((d) => d.items[0]);
    }

    setSearchCenter() {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            this.center = Config.defaultMapCenter;
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = Number.parseFloat(position.coords.latitude.toFixed(6));
                    const lng = Number.parseFloat(position.coords.longitude.toFixed(6));
                    this.center = `${lat},${lng}`;
                },
                (error) => console.log(error)
            );
        }
    }

    toLocationDto(hereLocation: IHereSearchResponse): LocationDto {
        const location = new LocationDto();
        location.hereId = hereLocation.id;
        location.toFormattedTitle(hereLocation.address);
        location.country = hereLocation.address.countryName;
        location.countryCode = hereLocation.address.countryCode;
        location.county = hereLocation.address.county;
        location.city = hereLocation.address.city;
        location.district = hereLocation.address.district;
        location.street = hereLocation.address.street;
        location.houseNumber = hereLocation.address.houseNumber;
        location.position = hereLocation.position;
        return location;
    }
}

/*
service.reverseGeocode({
  at: '52.5309,13.3847,150'
}, (result) => {
  result.items.forEach((item) => {
    // Assumption: ui is instantiated
    // Create an InfoBubble at the returned location with
    // the address as its contents:
    ui.addBubble(new H.ui.InfoBubble(item.position, {
      content: item.address.label
    }));
  });
}, alert);
*/
