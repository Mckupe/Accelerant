import { makeAutoObservable } from "mobx";

type ObjectProject = {
    id: number;
    name: string;
    nameCreator: string;
    arraySoc: Array<string>;
    favorit: boolean;
}

class projectDataStore {

    activeProject = {id: 0, name: ''};
    projectData: ObjectProject = this.resetProjectData();
    arrayProjectData: ObjectProject[] = this.resetArrayProjectData();

    resetProjectData() {
        return ({
            id: 0,
            name: '',
            nameCreator: '',
            arraySoc: [''],
            favorit: false
        });
    }

    resetArrayProjectData() {
        return ([]);
    }

    constructor() {
        makeAutoObservable(this)
    }

    changeActiveProject(id: number, name: string) {
        this.activeProject.id = id;
        this.activeProject.name = name;
    }
     
    changeProjectData(project: ObjectProject) {
        this.projectData.id = project.id;
        this.projectData.name = project.name;
        this.projectData.nameCreator = project.nameCreator;
        this.projectData.arraySoc = project.arraySoc;
        this.projectData.favorit = project.favorit;
    }

    addProject() {
        this.arrayProjectData.push(this.projectData);
        this.projectData = this.resetProjectData();
    }

    resetArray() {
        this.arrayProjectData = this.resetArrayProjectData();
    }

    favorit(id: number) {
        const index = this.arrayProjectData.map(project => project.id).indexOf(Number(id));
        const favorit = this.arrayProjectData[index].favorit = !this.arrayProjectData[index].favorit;
        return favorit;
    }

    get sort() {
        return this.arrayProjectData.slice().sort((x, y) => (x.favorit === y.favorit ? 0 : x.favorit ? -1 : 1));
        console.log(JSON.parse(JSON.stringify(this.arrayProjectData)));
    }
}

export const projectStore = new projectDataStore();