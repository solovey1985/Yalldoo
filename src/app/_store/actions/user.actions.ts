import { Action } from "@ngrx/store";
import { User } from "app/_models/user/user.model";

export enum AuthActionTypes {
    LOGIN = "[Auth] Login",
    LOGINSUCCESS = "[Auth] Login Success",
    LOGINFAILED = "[Auth] Login Failure"
}

export class LoginAction implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class LoginSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGINSUCCESS;
    constructor(public payload: User) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionTypes.LOGINFAILED;
    constructor(public  payload: any) {}
}

export type All = LoginAction | LoginSuccessAction;
