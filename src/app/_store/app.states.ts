import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import * as fromAuth from "./reducers/auth.reducers";
import * as fromUi from "./reducers/ui.reducers";
import * as fromEvents from "./reducers/events.reducer";
import * as fromCategories from "./reducers/categories.reducer";
import { ActionReducerMap, createSelector } from "@ngrx/store";
import { getMergedRoute } from "./selectors/router-state.selectors";

export interface AppState {
    router?: RouterReducerState;
    authState: fromAuth.AuthState;
    uiState: fromUi.UiState;
    eventsState: fromEvents.EventsState;
    categoriesState: fromCategories.CategoryState;
}

export function initialState(): AppState {
    return {
        router: null,
        eventsState: fromEvents.initialEventState,
        authState: fromAuth.initialState,
        uiState: fromUi.initialState,
        categoriesState: fromCategories.initialCategoryState
    };
}

export const appReducers: ActionReducerMap<AppState, any> = {
    router: routerReducer,
    authState: fromAuth.reducer,
    uiState: fromUi.reducer,
    eventsState: fromEvents.reducer,
    categoriesState: fromCategories.reducer
};

export const selectAuthState = (state: AppState) => state.authState;
export const selectUiState = (state: AppState) => state.uiState;
export const selectCategoriesState = (state: AppState) => state.categoriesState;
export const selectEventsState = (state: AppState) => state.eventsState;

export const selectAuthUser = createSelector(selectAuthState, (state: fromAuth.AuthState) => state.user);
export const selectIsLoading = createSelector(selectUiState, fromUi.getLoading);
export const selectError = createSelector(selectUiState, (state: fromUi.UiState) => state.error);
export const selectAllCategories = createSelector(selectCategoriesState, fromCategories.selectAll);
export const selectAllEvents = createSelector(selectEventsState, fromEvents.selectAllEvents);
export const selectAllEventEntities = createSelector(selectEventsState, fromEvents.selectEventEnties);
export const selectCurrentEventId = createSelector(
    selectAllEvents, getMergedRoute, (events, mergedRoute)=> Number.parseInt(mergedRoute.params.id)
);
export const selectPagination = createSelector(selectEventsState, fromEvents.getPagination)


export const selectCurrentEvent = createSelector(
    selectAllEventEntities,
    selectCurrentEventId,
    (eventEntities, eventId) => eventEntities[eventId]
);
