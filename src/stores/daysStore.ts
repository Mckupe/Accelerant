import { makeAutoObservable } from 'mobx';
import moment from 'moment';

class daysDataStore {
	dateForPosts = this.resetDayForPosts();
	
	resetDayForPosts() {
		return {
			month: Number(moment().format('M')),
			year: Number(moment().format('YYYY')),
		};
	}

	constructor() {
		makeAutoObservable(this);
	}

	changeDateForPost(plus: boolean) {
		if (plus) {
			if (this.dateForPosts.month === 12) {
				this.dateForPosts.month = 1;
				this.dateForPosts.year += 1;
			} else {
				this.dateForPosts.month += 1;
			}
		} else {
			if (this.dateForPosts.month === 1) {
				this.dateForPosts.month = 12;
				this.dateForPosts.year -= 1;
			} else {
				this.dateForPosts.month -= 1;
			}
		}
	}
}

export const dayStore = new daysDataStore();
