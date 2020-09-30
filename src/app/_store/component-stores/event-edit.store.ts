import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { CategoryModel } from "app/_models/category/category.model";
import { EPrivacyEnum } from "app/_models/common/privacy.enum";
import { EventModel } from "app/_models/events/event.model";
import { PaginationModel } from "app/_models/pagination/pagination.model";
import { EventService } from "app/_services/events/event.service";
import { Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { AppState, selectCurrentEventId } from "../app.states";

export interface EventEditState {
    event: EventModel;
    canEditEvent: boolean;
    categories: CategoryModel[];
    selectedCategoryId: number;
    selectedCategory: string;
    selectedPrivacy: EPrivacyEnum;
    isLoading: boolean;
}

const DEFAULT_STATE: EventEditState = {
    event: null,
    canEditEvent: true,
    categories: [],
    selectedCategory: null,
    selectedCategoryId: null,
    selectedPrivacy: EPrivacyEnum.public,
    isLoading: false
};

@Injectable()
export class EventEditStore extends ComponentStore<EventEditState> {
    eventId$: Observable<number>;
    eventId: number;

    constructor(private store: Store<AppState>, private eventService: EventService) {
        super(DEFAULT_STATE);
        this.eventId$ = store.select(selectCurrentEventId);
        this.loadEvent(this.eventId$);
    }
//#region Effects
    // LoadEvent
    readonly loadEvent = this.effect((eventId$: Observable<number>) => {
        this.setState((currentState) => {
            return {
                ...currentState,
                isLoading: true
            };
        });
        return eventId$.pipe(
            switchMap((id: number) => {
                return this.eventService.fetchEvent(id);
            }),
            tap((event: EventModel) => {
                this.setState((currentState) => {
                    return {
                        ...currentState,
                        isLoading: false
                    };
                });
                this.addEvent(event);
            })
        );
    });

//#endregion
    
    // Reducers
    readonly addEvent = this.updater((state: EventEditState, event: EventModel) => {
        return { ...state, event: event, canEditEvent: true };
    });
    readonly event$: Observable<EventModel> = this.select((state) => state.event);
    readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);
}
