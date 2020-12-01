import {
    CreateEventAction,
    EventActionEnum,
    CreateEventFailedAction,
    CreateEventSuccessAction,
    LoadEventsAction,
    LoadEventActionSuccess,
    LoadEventsActionSuccess,
    LoadEventAction,
    LoadEventsActionFailed,
    LoadEventActionFailed
} from "../actions/events.actions";
import { pipe, of, Observable } from "rxjs";
import { createEffect, ofType, Actions, act } from "@ngrx/effects";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { EventService } from "app/_services/events/event.service";
import { CreateEventModel } from "app/_models/events/create-event.model";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { EventModel } from "app/_models/events/event.model";
import { ErrorShowAction } from "../actions/ui.actions";

@Injectable()
export class EventEffects {
    eventCreate$ = createEffect(() =>
        this.actions.pipe(
            ofType(EventActionEnum.CREATE_EVENT),
            switchMap((action: CreateEventAction) => {
                return this.eventService.createEvent(action.payload).pipe(
                    map(
                        (event: EventModel) => {
                            this.router.navigate(["feed"]);
                            return new CreateEventSuccessAction(event);
                        },
                    ),
                    catchError((error) => of(new ErrorShowAction(error)))
                );
            })
        )
    );

    eventsLoad$ = createEffect(() =>
        this.actions.pipe(
            ofType(EventActionEnum.LOAD_EVENTS),
            switchMap((action: LoadEventsAction) => {
                return this.eventService.fetchEvents(action.payload).pipe(
                    map((response: any) => {
                        const events = response.data;
                        return new LoadEventsActionSuccess(events);
                    }),
                    catchError((err) => of(new LoadEventsActionFailed(err)))
                );
            })
        )
    );

    eventLoad$ = createEffect(() =>
        this.actions.pipe(
            ofType(EventActionEnum.LOAD_EVENT),
            switchMap((action: LoadEventAction) => {
                return this.eventService.fetchEvent(action.payload as number).pipe(
                    map((response: any) => {
                        return new LoadEventActionSuccess(response);
                    }),
                    catchError((err) => of(new LoadEventActionFailed(err)))
                );
            })
        )
    );
    constructor(private actions: Actions, private eventService: EventService, private router: Router) {}
}
