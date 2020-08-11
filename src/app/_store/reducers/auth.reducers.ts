import { AuthActionTypes, All } from "../actions/user.actions";
import { User } from "app/_models/user/user.model";

export interface State {
    isAuthenticated: boolean;
    user: User | null;

    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGINSUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    userName: action.payload.userName,
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}
