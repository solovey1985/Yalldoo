import LocationDto from "../location.dto";

export class UserRegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    city: LocationDto;
}
