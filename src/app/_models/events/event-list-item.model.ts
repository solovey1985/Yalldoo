import LocationDto from "../location.dto";

export class EventListItemModel{
    title: string;
    description: string;
    startAt: Date;
    privacy: number;
    categoryId: number;
    subCategoryId: number;
    location: LocationDto;
    image: string;
    invitedIds: number[];
    ownerId: string;
}