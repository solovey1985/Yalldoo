import { Category } from "../category/category.model";
import { EPrivacyEnum } from "../common/privacy.enum";
import LocationDto from "../location.dto";

export class CreateEventModel {
    title: string;
    description: string;
    startDate: Date;
    categoryId: number;
    privacy: EPrivacyEnum;
    location: LocationDto;
    image: string;
    invitedIds: number[]
}