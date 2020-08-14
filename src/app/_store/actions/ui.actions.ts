import { Action } from "@ngrx/store";

export enum UiActionTypes {
    LOADINGSTARTED = "[Ui] Loading Started",
    LOADINGFINISHED = "[Ui] Loading Finished",
}

export class LoadingStartedAction implements Action {
    readonly type = UiActionTypes.LOADINGSTARTED;
    constructor() {}
}

export class LoadingFinishedAction implements Action {
    readonly type = UiActionTypes.LOADINGFINISHED;
    constructor() {}
}

export type All =
    | LoadingStartedAction
    | LoadingFinishedAction