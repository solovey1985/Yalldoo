import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { CategoryModel } from "../../_models/category/category.model";
import { All } from "../actions/category.actions";
import { CategoryActionsEnum } from "../actions/category.actions";

export interface CategoryState extends EntityState<CategoryModel> {
    selectedCategoryId: number;
}

export const adapter = createEntityAdapter<CategoryModel>({
    sortComparer: sortBySeqNo
});

export const initialCategoryState = adapter.getInitialState({
    selectedCategoryId: null
});

export function reducer(state = initialCategoryState, action: All) {
    switch (action.type) {
        case CategoryActionsEnum.CATEGORIES_LOAD_SUCCESS: {
            return adapter.setAll(action.payload, { ...state, selectedCategoryId: null});
        }
        case CategoryActionsEnum.CATEGORY_LOAD_SUCCESS: {
            return adapter.upsertOne(action.payload.category, {
                ...state,
                selectedCategoryId: action.payload.category.id
            });
        }
        default: {
            return state;
        }
    }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

function sortBySeqNo(e1: CategoryModel, e2: CategoryModel) {
    return e1.seqNo - e2.seqNo;
}
