import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class userdataStore {
	userdata = this.resetUserData();
	datavalid = this.resetValid();

	resetUserData() {
		return {
			name: '',
			email: '',
			password: '',
		};
	}

	resetValid() {
		return {
			validEmail: true,
			validPassword: true,
		};
	}

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: 'userdataStore',
			properties: ['userdata'],
			storage: sessionStorage,
		});
	}

	changeName(name: string) {
		this.userdata.name = name;
	}

	changeEmail(email: string) {
		this.userdata.email = email;
	}

	changePassword(password: string) {
		this.userdata.password = password;
	}

	changeValidEmail(email: boolean) {
		this.datavalid.validEmail = email;
	}

	changeValidPassword(password: boolean) {
		this.datavalid.validPassword = password;
	}
}

export const userStore = new userdataStore();
