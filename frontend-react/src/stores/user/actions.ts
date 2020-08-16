import {SET_USER, UserStoreAction} from "./types";
import {User} from "../../client/generated";


export function setUserAction(user: User): UserStoreAction {
    return {
        type: SET_USER,
        payload: user
    }
}