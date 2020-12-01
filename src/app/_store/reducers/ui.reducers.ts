import { UIActionEnum, All } from "../actions/ui.actions";
import { AuthActionTypes } from "../actions/user.actions";
import { CategoryActionsEnum } from "../actions/category.actions";
import { EventActionEnum } from "../actions/events.actions";
import { RouterActionsEnum } from "../actions/router.actions";

export interface UiState {
    isLoading: boolean;
    error: string;
}

export const initialState: UiState = {
    isLoading: false,
    error: undefined
};

export function reducer(state = initialState, action: any) {
    switch (action.type) {
        case EventActionEnum.LOAD_EVENTS:
        case EventActionEnum.LOAD_EVENT:
        case EventActionEnum.CREATE_EVENT:
        case AuthActionTypes.LOGIN:
        case AuthActionTypes.REGISTER:
        case UIActionEnum.LOADING_STARTED: {
            return {
                ...state,
                isLoading: true
            };
        }
        case EventActionEnum.LOAD_EVENTS_SUCCESS:
        case EventActionEnum.LOAD_EVENT_SUCCESS:
        case EventActionEnum.LOAD_EVENTS_FAILED:
        case EventActionEnum.LOAD_EVENT_FAILED:
        case EventActionEnum.CREATE_EVENT_SUCCESS:
        case EventActionEnum.CREATE_EVENT_FAILED:
        case AuthActionTypes.LOGIN_FAILED:
        case AuthActionTypes.LOGIN_SUCCESS:
        case AuthActionTypes.REGISTER_FAILED:
        case UIActionEnum.LOADING_FINISHED: {
            return {
                ...state,
                isLoading: false
            };
        }
        case EventActionEnum.CREATE_EVENT_FAILED:
        case UIActionEnum.ERROR_SHOW: {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        }
        case UIActionEnum.ERROR_HIDE: {
            return {
                ...state,
                error: null
            };
        }
        default: {
            return state;
        }
    }
}

export const getLoading = (state: UiState) => state.isLoading;
export const getError = (state: UiState) => state.error;
