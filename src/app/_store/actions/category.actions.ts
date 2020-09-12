import { Action } from "@ngrx/store";
import { Category } from "app/_models/category/category.model";

export enum CategoryActionsEnum {
    CATEGORIES_LOAD = "[Categories] Load",
    CATEGORIES_LOAD_SUCCESS = "[Categories] Load Success",
    CATEGORIES_LOAD_FAILED = "[Categories] Load Failed",
    CATEGORY_LOAD = "[Category] Load",
    CATEGORY_LOAD_SUCCESS = "[Category] Load Success",
    CATEGORY_LOAD_FAILED = "[Category] Load Failed"
}

export class CategoriesLoadAction implements Action {
    readonly type = CategoryActionsEnum.CATEGORIES_LOAD;
    constructor(public payload?: any) {}
}
export class CategoriesLoadSuccessAction implements Action {
    readonly type = CategoryActionsEnum.CATEGORIES_LOAD_SUCCESS;
    constructor(public payload:  Category[]) {}
}
export class CategoriesLoadFailedAction implements Action {
    readonly type = CategoryActionsEnum.CATEGORIES_LOAD_FAILED;
    constructor(public payload: any) {}
}

// *********Single Category**************/
export class CategoryLoadAction implements Action {
    readonly type = CategoryActionsEnum.CATEGORY_LOAD;
    constructor(public payload: number) {}
}
export class CategoryLoadSuccessAction implements Action {
    readonly type = CategoryActionsEnum.CATEGORY_LOAD_SUCCESS;
    constructor(public payload: { category: Category }) {}
}
export class CategoryLoadFailedAction implements Action {
    readonly type = CategoryActionsEnum.CATEGORY_LOAD_FAILED;
    constructor(public payload: any) {}
}

export type All =
    CategoriesLoadAction
    | CategoriesLoadSuccessAction
    | CategoriesLoadFailedAction
    | CategoryLoadAction
    | CategoryLoadSuccessAction
    | CategoryLoadFailedAction
