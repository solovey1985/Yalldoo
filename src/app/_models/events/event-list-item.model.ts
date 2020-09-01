import LocationDto from "../location.dto";

export class EventListItemModel{
    title: string;
    description: string;
    startDate: Date;
    privacy: number;
    categoryId: number;
    category: string;
    subCategoryId: number;
    subCategory: string;
    location: LocationDto;
    image: string;
    invitedIds: number[];
    ownerId: string;
}