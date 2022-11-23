import { makeAutoObservable } from 'mobx';
import { oneProjectStore } from './oneProjectStore';
class projectDataStore {
	arrayProjectData: ObjectProject[] = this.resetArrayProjectData();

	resetArrayProjectData() {
		return [];
	}

	constructor() {
		makeAutoObservable(this);
	}

	addProject() {
		this.arrayProjectData.push(oneProjectStore.projectData);
		oneProjectStore.projectData = oneProjectStore.resetProjectData();
	}

	resetArray() {
		this.arrayProjectData = this.resetArrayProjectData();
	}

	favorit(id: number) {
		const index = this.arrayProjectData
			.map(project => project.id)
			.indexOf(Number(id));
		const favorit = (this.arrayProjectData[index].favorit =
			!this.arrayProjectData[index].favorit);
		return favorit;
	}

	get sort() {
		return this.arrayProjectData
			.slice()
			.sort((x, y) => (x.favorit === y.favorit ? 0 : x.favorit ? -1 : 1));
	}
}

export const projectStore = new projectDataStore();
