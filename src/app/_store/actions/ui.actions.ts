import { Action } from "@ngrx/store";

export enum UiActionTypes {
    LOADINGSTARTED = "[Ui] Loading Started",
    LOADINGFINISHED = "[Ui] Loading Finished",
    ERRORSHOW ="[Ui] Showing Error",
    ERRORHIDE ="[Ui] Showing Hide",
}

export class LoadingStartedAction implements Action {
    readonly type = UiActionTypes.LOADINGSTARTED;
    constructor() {}
}

export class LoadingFinishedAction implements Action {
    readonly type = UiActionTypes.LOADINGFINISHED;
    constructor() {}
}

export class ErrorShowAction implements Action {
    readonly type = UiActionTypes.ERRORSHOW;
    constructor(public payload: string) {}
}

export class ErrorHideAction implements Action {
    readonly type = UiActionTypes.ERRORHIDE;
    constructor() {}
}

export type All =
    | LoadingStartedAction
    | LoadingFinishedAction
    | ErrorShowAction
    | ErrorHideAction