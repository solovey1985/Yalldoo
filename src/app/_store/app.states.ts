import * as fromAuth from "./reducers/auth.reducers";
import * as fromUi from "./reducers/ui.reducers";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

export interface AppState {
    authState: fromAuth.AuthState;
    uiState: fromUi.UiState;
}

export function initialState(): AppState {
    return {
        authState: fromAuth.initialState,
        uiState: fromUi.initialState
    };
}

export const appReducers: ActionReducerMap<AppState, any> = {
  authState: fromAuth.reducer,
  uiState: fromUi.reducer
  
};

export const selectAuthState = (state: AppState) => state.authState;
export const selectUiState = (state: AppState) => state.uiState;

export const selectAuthUser = createSelector(selectAuthState, (state: fromAuth.AuthState) => state.user);
export const selectIsLoading = createSelector(selectUiState, (state: fromUi.UiState) => state.isLoading);
