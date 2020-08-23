export class EventLocationModel {
    constructor(
        public address: string,
        public latitude: number,
        public longitude: number,
        public mapUrl: string,
        public locationType: ELocationType
    ) {}
}

export enum ELocationType {
    mapUrl = 1,
    coordinates = 2,
    text = 3
}
