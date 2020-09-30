import { CategoryModel } from "../category/category.model";
import { EPrivacyEnum } from "../common/privacy.enum";
import LocationDto from "../location.dto";
import { User } from "../user/user.model";
import UserInformation from "../user/user-information.model";

export class EventModel {
    // Service fields
    id: number;
    eventId: string;
    seqNo: number;
    // Data
    title: string;
    description: string;
    startDate: Date;
    categoryId: number;
    category: string;
    privacy: EPrivacyEnum;
    location: LocationInDTO;
    image: string;
    invitedIds: number[];
    ownerId: string;
    owner: UserInformation;
}


export class LocationInDTO {
    address: string;
    latitude: number;
    longitude: number;
    mapUrl: string;
    type: number;
}
