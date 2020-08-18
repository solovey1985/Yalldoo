import { Category } from "../category/category.model";
import { EPrivacyEnum } from "../common/privacy.enum";
import LocationDto from "../location.dto";
import { User } from "../user/user.model";
import UserInformation from "../user/user-information.model";

export class EventModel {
    //Ordering
    id: number;
    eventId: string;
    seqNo: number;
    // Data
    title: string;
    description: string;
    startDate: Date;
    categoryId: number;
    category: Category;
    privacy: EPrivacyEnum;
    location: LocationDto;
    image: string;
    invitedIds: number[];
    ownerId: string;
    owner: UserInformation;
}
