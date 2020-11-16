import LocationDto from "../location.dto";
import { LocationModel } from "../location/event-create-location.model";

export default class UserInformation {

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    facebook: string;
    website: string;
    birthday: Date ;
    description: string;
    avatarImage: string;
    favoriteCategories: number[];
    location: LocationModel

    constructor() {

    }
}
