import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { EventModel } from "app/_models/events/event.model";
import { Action } from "rxjs/internal/scheduler/Action";
import * as fromEventActions from "../actions/events.actions";
import { EventActionEnum } from "../actions/events.actions";
import { act } from "@ngrx/effects";

function sortBySeqNo(e1: EventModel, e2: EventModel) {
    return e1.seqNo - e2.seqNo;
}

export interface EventsState extends EntityState<EventModel> {
    selectedEventId?: number;
}

export const adapter = createEntityAdapter<EventModel>({
    sortComparer: sortBySeqNo
});

export const initialEventState = adapter.getInitialState({
    selectId: null,
});

export function reducer(state = initialEventState, action: fromEventActions.All): EventsState {
    switch (action.type) {
        
        case EventActionEnum.CREATE_EVENT_SUCCESS: {
            return adapter.addOne(action.payload, state);
        }
        default: {
            return state;
        }
    }
}


export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  
  } = adapter.getSelectors();