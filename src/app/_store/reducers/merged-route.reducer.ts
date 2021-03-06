import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateSerializer } from "@ngrx/router-store";
import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from "@angular/router";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { routerStateConfig } from "app/core/router/ngrx-router.module";

export interface MergedRoute {
    url: string;
    queryParams: Params;
    params: Params;
    data: Data;
}

export type MergedRouteReducerState = RouterReducerState<MergedRoute>;

export class MergedRouterStateSerializer implements RouterStateSerializer<MergedRoute> {
    serialize(routerState: RouterStateSnapshot): MergedRoute {
        return {
            url: routerState.url,
            params: mergeRouteParams(routerState.root, (r) => r.params),
            queryParams: mergeRouteParams(routerState.root, (r) => r.queryParams),
            data: mergeRouteData(routerState.root)
        };
    }
}

function mergeRouteParams(route: ActivatedRouteSnapshot, getter: (r: ActivatedRouteSnapshot) => Params): Params {
    if (!route) {
        return {};
    }
    const currentParams = getter(route);
    const primaryChild = route.children.find((c) => c.outlet === "primary") || route.firstChild;
    return { ...currentParams, ...mergeRouteParams(primaryChild, getter) };
}

function mergeRouteData(route: ActivatedRouteSnapshot): Data {
    if (!route) {
        return {};
    }

    const currentData = route.data;
    const primaryChild = route.children.find((c) => c.outlet === "primary") || route.firstChild;
    return { ...currentData, ...mergeRouteData(primaryChild) };
}
