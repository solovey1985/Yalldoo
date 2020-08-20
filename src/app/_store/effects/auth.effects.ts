import { Injectable } from "@angular/core";
import { AuthService } from "app/_services/auth/auth.service";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, mergeMap, catchError, tap, exhaustMap } from "rxjs/operators";
import {
    AuthActionTypes,
    LogoutSuccessAction,
    LoginSuccessAction,
    LoginFailedAction,
    LogoutFailedAction,
    RegisterAction,
    RegisterSuccessAction,
    RegisterFailedAction
} from "../actions/user.actions";
import { User } from "app/_models/user/user.model";
import { LoadingStartedAction, LoadingFinishedAction, UIActionEnum, ErrorShowAction } from "../actions/ui.actions";
import { UserRegisterModel } from "app/_models/user/user-register.model";

@Injectable()
export class AuthEffects {
    constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

    Login$ = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.LOGIN),
            switchMap((action: any) => {
                return this.authService.logIn(action.payload.email, action.payload.password).pipe(
                    map((user) => new LoginSuccessAction(user)),
                    catchError((error) => of(new ErrorShowAction(error)))
                );
            })
        )
    );

    LoginSuccess$: Observable<any> = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.LOGIN_SUCCESS),
            map((action: any) => action.payload),
            switchMap((user: any) => {
                localStorage.setItem("user", JSON.stringify(user));
                this.router.navigateByUrl("/feed");
                return of(new LoadingFinishedAction());
            })
        )
    );

    Logout$ = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.LOGOUT),
            switchMap((action: any) => {
                try {
                    this.authService.logout();
                    return of(new LogoutSuccessAction());
                } catch {
                    return of(new LogoutFailedAction("Error on user logout"));
                }
            })
        )
    );

    Register$ = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.REGISTER),
            map((action: RegisterAction) => action.payload),
            switchMap((user: UserRegisterModel) => {
                return this.authService.register(user).pipe(
                    map((user: User) => {
                        return new RegisterSuccessAction(user);
                    }),
                    catchError((err) => {
                        return of(new RegisterFailedAction("Error on user registration"));
                    })
                );
            })
        )
    );

    RegisterSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.REGISTER_SUCCESS),
            map((action: RegisterSuccessAction) => action.payload),
            switchMap((user: User) => {
                localStorage.setItem("user", JSON.stringify(user));
                this.router.navigateByUrl("/preferences");
                return of(new LoadingFinishedAction());
            })
        )
    );
}
