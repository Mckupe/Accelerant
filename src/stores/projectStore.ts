import { makeAutoObservable } from "mobx";

class projectDataStore {

    projects: Array<Object> = this.resetProjects();
    projectData = this.resetProjectData();

    resetProjects() {
        return ([{}]);
    }

    resetProjectData() {
        return ({
            id: 0,
            name: ''
        });
    }

    constructor() {
        makeAutoObservable(this)
    }

    changeProjects(projects: Array<Object>) {
        this.projects = projects;
    }
     
    changeProjectData(id: number, name: string) {
        this.projectData.id = id;
        this.projectData.name = name;
    }
}

export const projectStore = new projectDataStore();