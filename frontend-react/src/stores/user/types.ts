import {User} from "../../client/generated";

export const SET_USER = "SET_USER"

interface UpdateUserAction {
    type: typeof SET_USER
    payload: User | null
}

export type UserStoreAction = UpdateUserAction

export interface UserState {
    user: User | null
}