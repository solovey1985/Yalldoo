import { Action } from "@ngrx/store";

export enum UIActionEnum {
    LOADING_STARTED = "[UI] Loading Started",
    LOADING_FINISHED = "[UI] Loading Finished",
    ERROR_SHOW = "[UI] Showing Error",
    ERROR_HIDE = "[UI] Showing Hide",
}

export class LoadingStartedAction implements Action {
    readonly type = UIActionEnum.LOADING_STARTED;
    constructor() {}
}

export class LoadingFinishedAction implements Action {
    readonly type = UIActionEnum.LOADING_FINISHED;
    constructor() {}
}

export class ErrorShowAction implements Action {
    readonly type = UIActionEnum.ERROR_SHOW;
    constructor(public payload: string) {}
}

export class ErrorHideAction implements Action {
    readonly type = UIActionEnum.ERROR_HIDE;
    constructor() {}
}

export type All =
    | LoadingStartedAction
    | LoadingFinishedAction
    | ErrorShowAction
    | ErrorHideAction
