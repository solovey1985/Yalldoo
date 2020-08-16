import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import * as fromAuth from "./reducers/auth.reducers";
import * as fromUi from "./reducers/ui.reducers";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

export interface AppState {
    router?: RouterReducerState;
    authState: fromAuth.AuthState;
    uiState: fromUi.UiState;
}

export function initialState(): AppState {
    return {
        router: null,
        authState: fromAuth.initialState,
        uiState: fromUi.initialState
    };
}

export const appReducers: ActionReducerMap<AppState, any> = {
    router: routerReducer,
    authState: fromAuth.reducer,
    uiState: fromUi.reducer
};

export const selectAuthState = (state: AppState) => state.authState;
export const selectUiState = (state: AppState) => state.uiState;

export const selectAuthUser = createSelector(selectAuthState, (state: fromAuth.AuthState) => state.user);
export const selectIsLoading = createSelector(selectUiState, fromUi.getLoading);
export const selectError = createSelector(selectUiState, (state: fromUi.UiState) => state.error);
