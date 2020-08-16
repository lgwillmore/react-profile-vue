import {SET_USER, UserState, UserStoreAction} from "./types";

const initialState: UserState = {
    user: null
}

export function userReducer(
    state = initialState,
    action: UserStoreAction
): UserState {
    switch (action.type) {
        case SET_USER:
            const s = {
                ...state,
                user: action.payload
            }
            return s
        default:
            return state
    }
}