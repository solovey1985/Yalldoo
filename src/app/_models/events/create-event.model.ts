import { CategoryModel } from "../category/category.model";
import { EPrivacyEnum } from "../common/privacy.enum";
import LocationDto from "../location.dto";
import { EventLocationModel } from "../location/event-create-location.model";

export class CreateEventModel {
    title: string;
    description: string;
    startDate: Date;
    categoryId: number;
    subCategoryId: number;
    privacy: EPrivacyEnum;
    location: EventLocationModel;
    image: string;
    invitedIds: number[];
    address: string;
    latitude: number;
    longitude: number;
    mapUrl: string;
    type: string;
}
