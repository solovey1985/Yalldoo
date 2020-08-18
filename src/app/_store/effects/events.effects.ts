import {
    CreateEventAction,
    EventActionEnum,
    CreateEventFailedAction,
    CreateEventSuccesstAction
} from "../actions/events.actions";
import { pipe, of } from "rxjs";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { EventService } from "app/_services/events/event.service";
import { CreateEventModel } from "app/_models/events/create-event.model";
import { switchMap, map, catchError } from "rxjs/operators";
import { EventModel } from "app/_models/events/event.model";

@Injectable()
export class EventsEffects {
    constructor(private actions: Actions, private eventService: EventService, private router: Router) {}

    eventCreate$ = createEffect(() =>
        this.actions.pipe(
            ofType(EventActionEnum.CREATE_EVENT),
            switchMap((action: CreateEventAction) => {
                return this.eventService.createEvent(action.payload).pipe(
                    map(
                        (event: EventModel) => new CreateEventSuccesstAction(event),
                        catchError((error) => of(new CreateEventFailedAction(error)))
                    )
                );
            })
        )
    );
}
