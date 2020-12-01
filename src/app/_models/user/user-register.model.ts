import { LocationInDTO } from "../events/event.model";

export class UserRegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    city: LocationInDTO;
}
