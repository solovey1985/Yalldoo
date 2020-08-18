import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Category } from "../../_models/category/category.model";
import { Action } from "@ngrx/store";

export interface CategoryState extends EntityState<Category> {
    selectedCategoryId: number;
}

export const adapter = createEntityAdapter<Category>({
    sortComparer: sortBySeqNo
});

export const initialCategoryState = adapter.getInitialState({
    selectedcategoryId: null
});

export function reducer(state = initialCategoryState, action: All) {
    switch (action.type) {
        case CategoryActionsEnum.CATEGORIES_LOAD_SUCCESS: {
           return adapter.setAll(action.payload.categories, state);
        }
        case CategoryActionsEnum.CATEGORY_LOAD_SUCCESS: {
            return adapter.upsertOne(action.payload.category, {...state, selectedcategoryId:action.payload.category.id})
        }
    }
}

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
    constructor(public payload: { categories: Category[] }) {}
}
export class CategoriesLoadFailedAction implements Action {
    readonly type = CategoryActionsEnum.CATEGORIES_LOAD_FAILED;
    constructor(public payload: any) {}
}

//*********Single Category**************/
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

function sortBySeqNo(e1: Category, e2: Category) {
    return e1.seqNo - e2.seqNo;
}
