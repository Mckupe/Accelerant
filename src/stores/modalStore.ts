import { makeAutoObservable } from "mobx";

class modalDataStore {

    modal = this.resetModal();
    addModal = this.resetAddModal();

    resetModal() {
        return (false);
    }

    resetAddModal() {
        return (false);
    }

    constructor() {
        makeAutoObservable(this)
    }

    changeModal(modal: boolean) {
        this.modal = modal;
    }

    changeAddModal(modal: boolean) {
        this.addModal = modal;
    }
}

export const modalStore = new modalDataStore();