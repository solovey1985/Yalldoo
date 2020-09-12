import { Action } from "@ngrx/store"
import { EventActionEnum } from "../actions/events.actions";
import { PaginationActionEnum } from "../actions/pagination.actions";

export interface PaginationState {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}


export const initialState: PaginationState = {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecords: 0
}

export function reducer(state = initialState, action: any) {
    switch (action.type) {
        case EventActionEnum.LOAD_EVENTS_SUCCESS: {
            return { ...state, totalRecords: action.payload.totalRecords,  totalPages: action.payload.totalPages }
        }
        case PaginationActionEnum.PAGE_CHANGED: {
                return {...state, pageNumber: action.payload }
            }
        default: {
            return state
        }
    }
}

export const selectCurrentPage = (state: PaginationState) => state.pageNumber;
export const selectTotalPages = (state: PaginationState) => state.totalPages;
