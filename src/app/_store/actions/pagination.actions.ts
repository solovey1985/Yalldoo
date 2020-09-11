import { Action } from "@ngrx/store";

export enum PaginationActionEnum {
    PAGE_CHANGED = "[PAGINATION] Page Changed"
}

export class PageChangedAction implements Action {
    readonly type = PaginationActionEnum.PAGE_CHANGED;

    constructor(public payload: number) {}
}
