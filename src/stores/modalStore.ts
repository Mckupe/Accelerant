import { makeAutoObservable } from 'mobx';

class modalDataStore {
	modalProject = false;
	modalPost = false;
	modalTalk = false;
	modalTheme = false;
	modalTg = false;
	modalMore = false;
	addProject = false;
	addPost = false;
	addTheme = false;
	addTg = false;

	constructor() {
		makeAutoObservable(this);
	}

	changeModalProject() {
		this.modalProject = !this.modalProject;
	}

	changeAddProject() {
		this.addProject = !this.addProject;
	}

	changeAddPost() {
		this.addPost = !this.addPost;
	}

	changeAddTheme() {
		this.addTheme = !this.addTheme;
	}

	changeModalPost() {
		this.modalPost = !this.modalPost;
	}

	changeModalTalk() {
		this.modalTalk = !this.modalTalk;
	}

	changeModalTheme() {
		this.modalTheme = !this.modalTheme;
	}

	changeModalTg() {
		this.modalTg = !this.modalTg;
	}

	changeModalMore() {
		this.modalMore = !this.modalMore;
	}

	changeAddTg() {
		this.addTg = !this.addTg;
	}
}

export const modalStore = new modalDataStore();
