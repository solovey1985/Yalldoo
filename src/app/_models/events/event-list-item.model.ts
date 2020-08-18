import LocationDto from "../location.dto";

export class EventListItemModel{
    title: string;
    description: string;
    startDate: Date;
    categoryId: number;
    location: LocationDto;
    image: string;
    invitedIds: number[];
    ownerId: string;
}