import { makeAutoObservable } from "mobx";

class tokenDataStore {

    token = this.resetToken();

    resetToken() {
        return ('');
    }

    constructor() {
        makeAutoObservable(this)
    }

    addtoken(token: string) {
        this.token = token;
    }
}

export const tokenStore = new tokenDataStore();