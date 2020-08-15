import {UserLoginResponse, UserRegister} from "../../src/client/generated";
import {AxiosResponse} from "axios";

export function userLoginResponseFixture(): UserLoginResponse {
    return {
        token: "some_token",
        user: {
            name: "Jane",
            surname: "Smith",
            email: "jane@somewhere.com"
        }
    }
}

export function userRegisterFixture(): UserRegister {
    return {
        email: "jane@somewhere.com",
        password: "some_password"
    }
}

export function axify<T>(data: T, status: number): AxiosResponse<T> {
    return {
        data: data,
        status: status,
        statusText: "",
        config: {},
        request: null,
        headers: null
    }
}