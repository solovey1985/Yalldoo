import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { EventModel } from "app/_models/events/event.model";
import * as fromEventActions from "../actions/events.actions";
import { EventActionEnum } from "../actions/events.actions";

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
        case EventActionEnum.LOAD_EVENTS_SUCCESS: {
            return adapter.addMany(action.payload, state);
        }
        case EventActionEnum.LOAD_EVENT_SUCCESS: {
            return adapter.addMany(action.payload, { ...state, selectedEventId: action.payload[0].id });
        }
        default: {
            return state;
        }
    }
}

const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  
} = adapter.getSelectors();
 
export const selectEventIds = selectIds;
// select the array of events
export const selectAllEvents = selectAll;
// select the dictionary of user entities
export const selectEventEnties = selectEntities;
// select the total event count
export const selectEventsTotal = selectTotal;
// select the total user count
export const getSelectedEventId = (state: EventsState) => state.selectedEventId;
