import { UiActionTypes, All } from "../actions/ui.actions";

export interface UiState {
    isLoading: boolean;
}

export const initialState: UiState = {
    isLoading: false
};

export function reducer(state = initialState, action: All) {
    switch (action.type) {
        case UiActionTypes.LOADINGSTARTED: {
            return {
                ...state,
                isLoading: true
            };
        }
        case UiActionTypes.LOADINGFINISHED: {
            return {
                ...state,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}

export const getLoading = (state: UiState) => state.isLoading;