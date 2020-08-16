import { Action } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";
export enum ERouterActions {
    Go = "[Router] Go",
    Forward = "[Router] Forward",
    Back = "[Router] Back",
    Change = "[Router] Change"
}

export class RouterGo implements Action {
    readonly type = ERouterActions.Go;

    constructor(
        public payload: {
            path: any[];
            queryParams?: object;
            extras?: NavigationExtras;
        }
    ) {}
}

export class RouterForward implements Action {
    public readonly type = ERouterActions.Forward;
    constructor() {}
}

export class RouterBack implements Action {
    public readonly type = ERouterActions.Back;
    constructor() {}
}

export class RouteChange implements Action {
    readonly type = ERouterActions.Change;
    constructor(public payload: { params: any; path: string }) {}
}

export type RouterActions = RouterGo | RouterForward | RouterBack | RouteChange;
