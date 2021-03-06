import {SET_USER, UserState, UserStoreAction} from "./types";

const initialState: UserState = {
    // user: {
    //     id: "1",
    //     name: "Frank",
    //     surname: "Herbert",
    //     email: "frank@dune.com"
    // }
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