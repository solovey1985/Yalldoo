import { UiActionTypes, All } from "../actions/ui.actions";
import { AuthActionTypes } from "../actions/user.actions";

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
        case AuthActionTypes.LOGIN:
        case AuthActionTypes.REGISTER:
        case UiActionTypes.LOADINGSTARTED: {
            return {
                ...state,
                isLoading: true
            };
        }
        case AuthActionTypes.LOGINFAILED:
        case AuthActionTypes.LOGINSUCCESS:
        case UiActionTypes.LOADINGFINISHED: {
            return {
                ...state,
                isLoading: false
            };
        }
        case UiActionTypes.ERRORSHOW: {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        }
        case UiActionTypes.ERRORHIDE: {
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