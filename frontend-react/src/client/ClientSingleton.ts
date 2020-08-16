import {DefaultApi} from "./generated";

export class ClientSingleton {

    private constructor() {
    }

    private static instance: DefaultApi | null = null

    static getInstance(): DefaultApi {
        if (this.instance == null) {
            this.instance = new DefaultApi()
        }
        return this.instance
    }

    static setInstance(api: DefaultApi) {
        if (this.instance != null) {
            throw Error("Already set")
        }
        this.instance = api
    }
}