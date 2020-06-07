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
        var value = "";

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
    }
}