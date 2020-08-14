import { Injectable } from "@angular/core";
import { AuthService } from "app/_services/auth/auth.service";
import { Router } from "@angular/router";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, mergeMap, catchError, tap, exhaustMap } from "rxjs/operators";
import {
    AuthActionTypes,
    LogoutSuccessAction,
    LoginSuccessAction,
    LoginFailedAction,
    LogoutFailedAction
} from "../actions/user.actions";
import { User } from "app/_models/user/user.model";
import { LoadingStartedAction, LoadingFinishedAction } from "../actions/ui.actions";

@Injectable()
export class AuthEffects {
    constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

    Login$ = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.LOGIN),
            switchMap((action: any) => {
                return this.authService.logIn(action.payload.email, action.payload.password).pipe(
                    map((user) => new LoginSuccessAction(user)),
                    catchError((error) => of(new LoginFailedAction(error)))
                );
            })
        )
    );

    LoginSuccess$: Observable<any> = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.LOGINSUCCESS),
            map((action: any) => action.payload),
            switchMap((user: any) => {
                localStorage.setItem("user", JSON.stringify(user));
                this.router.navigateByUrl("/preferences");
                return of(new LoadingFinishedAction())
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
}
