import {DefaultApi} from "./generated";

export class ClientSingleton {

    private constructor() {
    }

    private static instance: DefaultApi | null = null

    static getInstance(): DefaultApi {
        if (this.instance == null) {
            console.log("Instance is null")
            this.instance = new DefaultApi()
        }
        return this.instance
    }

    static setInstance(api: DefaultApi) {
        console.log("setting instance")
        this.instance = api
    }
}