import { Action } from "@ngrx/store";
import { User } from "app/_models/user/user.model";
import { UserRegisterModel } from "app/_models/user/user-register.model";

export enum AuthActionTypes {
    LOGIN = "[Auth] Login",
    LOGIN_SUCCESS = "[Auth] Login Success",
    LOGIN_FAILED = "[Auth] Login Failure",
    LOGOUT = "[Auth] Logout",
    LOGOUT_SUCCESS = "[Auth] Logout Success",
    LOGOUT_FAILED = "[Auth] Logout Failure",
    REGISTER = "[Auth] Register",
    REGISTER_SUCCESS = "[Auth] Register Success",
    REGISTER_FAILED = "[Auth] Register Failed",
}

export class LoginAction implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class LoginSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: User ) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILED;
    constructor(public payload: any) {}
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
    constructor() {}
}

export class LogoutSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGOUT_SUCCESS;
    constructor() {}
}

export class LogoutFailedAction implements Action {
    readonly type = AuthActionTypes.LOGOUT_FAILED;
    constructor(public payload: any) {}
}

export class RegisterAction implements Action {
    readonly type = AuthActionTypes.REGISTER;
    constructor(public payload: UserRegisterModel) {}
}

export class RegisterSuccessAction implements Action {
    readonly type = AuthActionTypes.REGISTER_SUCCESS;
    constructor(public payload: User) {}
}

export class RegisterFailedAction implements Action {
    readonly type = AuthActionTypes.REGISTER_FAILED;
    constructor(public payload: any) {}
}

export type All =
    | LoginAction
    | LoginSuccessAction
    | LoginFailedAction
    | LogoutAction
    | LogoutSuccessAction
    | LogoutFailedAction
    | LoginFailedAction
    | RegisterAction
    | RegisterSuccessAction
    | RegisterFailedAction;
