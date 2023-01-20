import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class oneProjectDataStore {
	activeProject = { id: 0, name: '',nameCreator: ''};
	projectData: ObjectProject = this.resetProjectData();

	resetProjectData() {
		return {
			id: 0,
			name: '',
			nameCreator: '',
			arraySoc: [''],
			favorit: false,
		};
	}

	resetArrayProjectData() {
		return [];
	}

	constructor() {
		makePersistable(this, {
			name: 'projectDataStore',
			properties: ['activeProject'],
			storage: sessionStorage,
		});
		makeAutoObservable(this);
	}

	changeActiveProject(id: number, name: string, nameCreator: string) {
		this.activeProject.id = id;
		this.activeProject.name = name;
		this.activeProject.nameCreator = nameCreator;
	}

	changeProjectData(project: ObjectProject) {
		this.projectData.id = project.id;
		this.projectData.name = project.name;
		this.projectData.nameCreator = project.nameCreator;
		this.projectData.arraySoc = project.arraySoc;
		this.projectData.favorit = project.favorit;
	}
}

export const oneProjectStore = new oneProjectDataStore();
