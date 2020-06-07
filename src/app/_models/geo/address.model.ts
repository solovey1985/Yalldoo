export class AddressModel {
    items: IHereSearchResponse[];
}

export interface IHereSearchResponse {
    id: string;
    title: string;
    address: IHereAddress;
    position: IHerePosition;
    resultType: EHereResultType;
    localityType: EHereLocalityType;
    distance: number;
}

export interface IHereAddress {
    label: string;
    countryCode: string;
    countryName: string;
    county: string;
    city: string;
    district: string;
    street: string;
    postalCode: string;
    houseNumber: string;
}

export interface IHerePosition {
    lat: number;
    lng: number;
}

export enum EHereResultType {
    unit,
    houseNumber,
    addressBlock,
    street,
    locality,
    administrativeArea,
    place,
    chainQuery,
    categoryQuery
}
export enum EHereLocalityType {
    postalCode,
    subdistrict,
    district,
    city
}
