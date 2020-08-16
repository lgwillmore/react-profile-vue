import {createStore} from "redux";
import {userReducer} from "./user/reducers";

export const userStore = createStore(userReducer)
