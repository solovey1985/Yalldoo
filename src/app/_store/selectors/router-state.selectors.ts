import {createFeatureSelector, createSelector} from "@ngrx/store";
import { routerStateConfig } from "app/core/router/ngrx-router.module";
import { MergedRouteReducerState } from "../reducers/merged-route.reducer";


export const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState) => routerReducerState.state);
