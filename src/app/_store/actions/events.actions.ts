import { Action } from "@ngrx/store";
import { EventModel } from "app/_models/events/event.model";
import { CreateEventModel } from "app/_models/events/create-event.model";
import { EventListItemModel } from "app/_models/events/event-list-item.model";

export enum EventActionEnum {
    CREATE_EVENT = "[Events] Create Event",
    CREATE_EVENT_SUCCESS = "[Events] Create Event Success",
    CREATE_EVENT_FAILED = "[Events] Create Event Failed",
    LOAD_EVENTS = "[Events] Load Events",
    LOAD_EVENTS_SUCCESS = "[Events] Load Events Success",
    LOAD_EVENTS_FAILED = "[Events] Load Events Failed",
    LOAD_EVENT = "[Events] Load Single Event",
    LOAD_EVENT_SUCCESS = "[Events] Load Single Event Success",
    LOAD_EVENT_FAILED = "[Events] Load Single Event Failed"
}

export class CreateEventAction implements Action {
    readonly type = EventActionEnum.CREATE_EVENT;
    constructor(public payload: CreateEventModel) {}
}

export class CreateEventSuccesstAction implements Action {
    readonly type = EventActionEnum.CREATE_EVENT_SUCCESS;
    constructor(public payload: EventModel) {}
}

export class CreateEventFailedAction implements Action {
    readonly type = EventActionEnum.CREATE_EVENT_SUCCESS;
    constructor(public payload: any) {}
}

export class LoadEventAction implements Action {
    readonly type = EventActionEnum.LOAD_EVENT;
    constructor(public payload: number | string) {}
}

export class LoadEventActionSuccess implements Action {
    readonly type = EventActionEnum.LOAD_EVENT_SUCCESS;
    constructor(public payload: EventModel) {}
}

export class LoadEventActionFailed implements Action {
    readonly type = EventActionEnum.LOAD_EVENT_FAILED;
    constructor(public payload: any) {}
}

//This action should have filter payload or nothings, means on Server it should be defined
// or here by defaults(if server is dumb)
export class LoadEventsAction implements Action {
    readonly type = EventActionEnum.LOAD_EVENTS;
    constructor(public payload?: any) {}
}

export class LoadEventsActionSuccess implements Action {
    readonly type = EventActionEnum.LOAD_EVENTS_SUCCESS;
    constructor(public payload: EventListItemModel[]) {}
}

export class LoadEventsActionFailed implements Action {
    readonly type = EventActionEnum.LOAD_EVENTS_FAILED;
    constructor(public payload: any) {}
}

export type All =
    | CreateEventAction
    | CreateEventSuccesstAction
    | CreateEventFailedAction
    | LoadEventAction
    | LoadEventActionSuccess
    | LoadEventActionFailed
    | LoadEventsAction
    | LoadEventsActionFailed
    | LoadEventsActionSuccess;
