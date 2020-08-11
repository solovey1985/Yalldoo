import { Injectable } from "@angular/core";
import { AuthService } from "app/_services/auth/auth.service";
import { Router } from "@angular/router";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, mergeMap, catchError, tap, exhaustMap } from "rxjs/operators";
import { AuthActionTypes, LoginAction, LoginSuccessAction, LoginFailedAction } from "../actions/user.actions";
import { User } from "app/_models/user/user.model";

@Injectable()
export class AuthEffects {
    constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

    @Effect()
    Login$ = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActionTypes.LOGIN),
            switchMap(
                (action:any) => this.authService.logIn(action.payload.email, action.payload.password).pipe(map((user) => new LoginSuccessAction(user)),
                catchError((error) => of(new LoginFailedAction(error)))
            )
        )
    ));

    @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGINSUCCESS),
        tap((user) => {
            localStorage.setItem("token", user.payload.token);
            this.router.navigateByUrl("/preferences");
        })
    );
}
