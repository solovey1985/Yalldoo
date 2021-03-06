import { LocationInDTO } from "./events/event.model";
import { IHereSearchResponse, IHereAddress } from "./geo/address.model";

export default class LocationDto {
    id: number;
    hereId: string;
    title: string;
    country: string;
    countryCode: string;
    county: string;
    city: string;
    district: string;
    street: string;
    houseNumber: string;
    position: {
        lat: number;
        lng: number;
    };
    public toFormattedTitle(hereAddress: IHereAddress) {
        let value = "";

        if (hereAddress.houseNumber) {
            value = `${hereAddress.houseNumber}, `;
        }
        if (hereAddress.street) {
            value = value + `${hereAddress.street}, `;
        }
        if (hereAddress.district) {
            value = value + `${hereAddress.district}, `;
        }
        if (hereAddress.city && hereAddress.county !== hereAddress.city) {
            value = value + `${hereAddress.city}, `;
        }
        if (hereAddress.county) {
            value += hereAddress.county;
        }
        this.title = value;
        if (value.length === 0) {
            this.title = hereAddress.label;
        }

    }

    public toEventLocation(): LocationInDTO{
        let location = new LocationInDTO();
        
        location.address = this.title;
        location.latitude = this.position.lat;
        location.longitude = this.position.lng;
        location.type = 1;

        return location;
    }

    public static fromEventLocation(eventLocation: LocationInDTO):LocationDto {
        let location = new LocationDto();
        location.title = eventLocation.address;
        location.position = {
            lat: eventLocation.latitude,
            lng: eventLocation.longitude
        } 

        return location;
    }
}
