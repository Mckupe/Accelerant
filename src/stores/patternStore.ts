import { makeAutoObservable } from 'mobx';

class patternDataStore {
	arrayPatternData: ObjectPattern[] = this.resetArrayProjectData();
	activePattern: ObjectPattern = this.resetActivePattern();

	resetArrayProjectData() {
		return [];
	}

	resetActivePattern() {
		return {
			id: 0,
			name: '',
			nameText: '',
			text: '',
			userid: 0,
		};
	}

	constructor() {
		makeAutoObservable(this);
	}

	addPattern(pattern: ObjectPattern) {
		this.arrayPatternData.push(pattern);
	}

	resetArray() {
		this.arrayPatternData = this.resetArrayProjectData();
	}

	getPattern(id: number) {
		const index = this.arrayPatternData.map(pattern => pattern.id).indexOf(id);
		return this.arrayPatternData[index];
	}

	changeActivePattern(pattern: ObjectPattern) {
		this.activePattern = pattern;
	}
}

export const patternStore = new patternDataStore();
