import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { EventModel } from "app/_models/events/event.model";
import { PaginationModel } from "app/_models/pagination/pagination.model";
import { EventService } from "app/_services/events/event.service";
import { Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { AppState, selectCurrentEventId } from "../app.states";

export interface EventEditState  {
    event: EventModel
}

@Injectable()
export class EventEditStore extends ComponentStore<EventEditState>{
    eventId$: Observable<number>;
    eventId: number;
    
    constructor(private store: Store<AppState>, private eventService: EventService) {
        super({event: null});
        this.eventId$ = store.select(selectCurrentEventId);
        this.loadEvent(this.eventId$);
    }

    // Effects
    readonly loadEvent = this.effect(
        (eventId$: Observable<number>) =>
            eventId$.pipe(
                switchMap((id: number) => {
                    return this.eventService.fetchEvent(id);
                }),
                tap((event: EventModel) => { 
                    this.addEvent(event);
                })
            )
    );

    // Reducers
    readonly addEvent = this.updater((state: EventEditState, event: EventModel) => {
        return { ...state, event: event };
    });
    readonly event$: Observable<EventModel> = this.select(state => state.event);
}