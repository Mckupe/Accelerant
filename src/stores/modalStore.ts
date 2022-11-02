import { makeAutoObservable } from "mobx";

class modalDataStore {

    modal = this.resetModal();

    resetModal() {
        return (false);
    }

    constructor() {
        makeAutoObservable(this)
    }

    changeModal(modal: boolean) {
        this.modal = modal;
    }
}

export const modalStore = new modalDataStore();