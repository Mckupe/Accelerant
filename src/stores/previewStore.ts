import { makeAutoObservable } from 'mobx';

class previewDataStore {
	tg = false;
	vk = false;

	constructor() {
		makeAutoObservable(this);
	}

	changeModalTg(value: boolean) {
		this.tg = value;
	}

	changeModalVk(value: boolean) {
		this.vk = value;
	}
}

export const previewStore = new previewDataStore();
