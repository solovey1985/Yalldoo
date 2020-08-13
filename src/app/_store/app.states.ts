import * as fromAuth from './reducers/auth.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  authState: fromAuth.AuthState;
}


export const reducers: ActionReducerMap<AppState> = {
  authState: fromAuth.reducer,
};



export const selectAuthState = (state: AppState) => state.authState;

export const selectAuthUser = createSelector(selectAuthState, (state:fromAuth.AuthState)=> state.user);