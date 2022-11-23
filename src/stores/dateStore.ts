import { makeAutoObservable } from 'mobx';
import moment from 'moment';

class dateDataStore {
	calendar = this.resetCalendar();
	dateL = this.resetDateL();
	dateM = this.resetDateM();
	timeM = this.resetTimeM();
	currentDate = this.resetCurrentDate();

	resetCalendar() {
		return false;
	}

	resetDateL() {
		return moment().format('LLLL');
	}

	resetDateM() {
		return new Date(new Date().toDateString()).getTime();
	}

	resetTimeM() {
		const timeArr = moment().format('LT').split(':');
		return (Number(timeArr[0]) * 60 + Number(timeArr[1])) * 60 * 1000;
	}

	resetCurrentDate() {
		return 0;
	}

	constructor() {
		makeAutoObservable(this);
	}

	changeCalendar() {
		this.calendar = !this.calendar;
	}

	changeDateL(date: string) {
		this.dateL = date;
	}

	changeDateM(date: number) {
		this.dateM = date;
	}

	changeTimeM(time: number) {
		this.timeM = time;
	}

	changeCurrentDate(date: number) {
		this.currentDate = date;
	}

	resetAll() {
		this.dateM = this.resetDateM();
		this.dateL = this.resetDateL();
		this.currentDate = this.resetCurrentDate();
	}
}

export const dateStore = new dateDataStore();
