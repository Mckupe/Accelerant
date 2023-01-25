import { makeAutoObservable } from 'mobx';

class modalDataStore {
	modalPattern = false;
	modalProject = false;
	modalPost = false;
	modalTalk = false;
	modalPreview = false;
	modalTheme = false;
	modalFilterThemes = false;
	modalTg = false;
	modalVk = false;
	modalSoc = false;
	modalMore = false;
	patterns = false;
	addProject = false;
	addPattern = false;
	addPost = false;
	addTheme = false;
	addTg = false;
	addVk = false;

	updatePattern = false;

	constructor() {
		makeAutoObservable(this);
	}

	changeModalProject() {
		this.modalProject = !this.modalProject;
	}

	changeModalPattern() {
		this.modalPattern = !this.modalPattern;
	}

	changePatterns() {
		this.patterns = !this.patterns;
	}

	changeAddProject() {
		this.addProject = !this.addProject;
	}

	changeAddPattern() {
		this.addPattern = !this.addPattern;
	}

	changeAddPost() {
		this.addPost = !this.addPost;
	}

	changeAddTheme() {
		this.addTheme = !this.addTheme;
	}

	changeModalFilterThemes() {
		this.modalFilterThemes = !this.modalFilterThemes;
	}

	changeModalPost() {
		this.modalPost = !this.modalPost;
	}

	changeModalTalk() {
		this.modalTalk = !this.modalTalk;
	}

	changeModalPreview() {
		this.modalPreview = !this.modalPreview;
	}

	changeModalTheme() {
		this.modalTheme = !this.modalTheme;
	}

	changeModalTg() {
		this.modalTg = !this.modalTg;
	}

	changeModalSoc() {
		this.modalSoc = !this.modalSoc;
	}

	changeModalVk() {
		this.modalVk = !this.modalVk;
	}

	changeModalMore() {
		this.modalMore = !this.modalMore;
	}

	changeAddTg() {
		this.addTg = !this.addTg;
	}

	changeAddVk() {
		this.addVk = !this.addVk;
	}

	changeUpdatePattern() {
		this.updatePattern = !this.updatePattern;
	}
}

export const modalStore = new modalDataStore();
