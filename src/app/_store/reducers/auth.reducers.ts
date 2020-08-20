import { AuthActionTypes, All } from "../actions/user.actions";
import { User } from "app/_models/user/user.model";
const loadUser = (): User => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        return undefined;
    }
};
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;

    errorMessage: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: loadUser()? true: false,
    user: loadUser(),
    errorMessage: null
};

export function reducer(state = initialState, action: All): AuthState {
    switch (action.type) {
        case AuthActionTypes.REGISTER_SUCCESS:
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload
            };
        }
        case AuthActionTypes.LOGOUT_SUCCESS: {
            return {
                ...state, user: null, isAuthenticated: false
            };
        }
        case AuthActionTypes.LOGOUT_FAILED: {
            return {
                ...state, errorMessage: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export const getUser = (state: AuthState) => state.user;
export const getIsAuthinticated = (state: AuthState) => state.isAuthenticated;
export const getError = (state: AuthState) => state.errorMessage;
