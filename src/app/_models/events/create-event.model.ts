import { Category } from "../category/category.model";
import { EPrivacyEnum } from "../common/privacy.enum";
import LocationDto from "../location.dto";

export class CreateEventModel {
    title: string;
    description: string;
    startDate: Date;
    categoryId: number;
    subCategoryId: number;
    privacy: EPrivacyEnum;
    location: LocationDto;
    image: string;
    invitedIds: number[];
    address: string;
    latitude: number;
    longitude: number;
    mapUrl: string;
    type: string;

    public mapLoaction() {
        this.address = this.location.title;
        this.latitude = this.location.position.lat;
        this.longitude = this.location.position.lng;
        this.type = "Coordinates";
    }
}
