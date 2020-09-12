import { RouterGo, RouteChange } from "../actions/router.actions";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { tap, map, filter } from "rxjs/operators";
import { Router, ActivationEnd } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../app.states";
import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
@Injectable()
export class RouterEffects {

    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType("[Router] Go"),
        map((action: RouterGo) => action.payload),
        tap(({ path, queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType("[Router] Back"),
        tap(() => this.location.back())
    );

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType("[Router] Forward"),
        tap(() => this.location.forward())
    );
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location,
        private store: Store<AppState>
    ) {
        this.listenToRouter();
    }

    private listenToRouter() {
        this.router.events.pipe(filter((event) => event instanceof ActivationEnd)).subscribe((event: ActivationEnd) =>
            this.store.dispatch(
                new RouteChange({
                    params: { ...event.snapshot.params },
                    path: event.snapshot.routeConfig.path
                })
            )
        );
    }
}
