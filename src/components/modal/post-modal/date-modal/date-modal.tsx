import styles from './date-modal.module.scss';
import { observer } from 'mobx-react-lite';
import Calendar from 'react-calendar';
import './calendar.scss';
import './time.scss';
import moment from 'moment';
import 'moment/locale/ru';
import { dateStore } from '../../../../stores/dateStore';
import { useState } from 'react';
import dayjs from 'dayjs';
import { TimePicker } from 'antd';

const DateModal = () => {
	const [alert, setAlert] = useState('');

	const onChangeDate = (date: Date) => {
		dateStore.changeDateM(moment(date).startOf('day').valueOf());
		dateStore.changeCurrentDate(dateStore.dateM + dateStore.timeM);
		moment.locale('ru');
		dateStore.changeDateL(moment(date).format('LLLL'));
		setAlert('');
	};

	function onChangeTime(value: dayjs.Dayjs | null) {
		let time = value?.format('HH:mm');
		const timeArr = time?.split(':');
		dateStore.timeM =
			(Number(timeArr![0]) * 60 + Number(timeArr![1])) * 60 * 1000;
		dateStore.changeCurrentDate(dateStore.dateM + dateStore.timeM);
		setAlert('');
	}

	function onSaveClick() {
		if (dateStore.currentDate < Date.now()) {
			setAlert('Дата публикации в прошлом!');
		} else {
			dateStore.changeCalendar();
		}
	}

	if (!dateStore.calendar) return null;

	return (
		<>
			<div
				onClick={() => {
					if (dateStore.currentDate === 0) {
						dateStore.changeCalendar();
						dateStore.resetAll();
						setAlert('');
					} else {
						dateStore.changeCalendar();
						setAlert('');
					}
				}}
				className={styles.black}
			></div>
			<div className={styles.main__container}>
				<div className={styles.container}>
					<Calendar
						onChange={onChangeDate}
						value={new Date()}
						locale='ru'
						navigationLabel={({ label }) => (label = label.split(' ')[0])}
						minDate={new Date()}
						prevLabel={''}
						nextLabel={''}
						next2Label={null}
						prev2Label={null}
						showFixedNumberOfWeeks={true}
					/>
				</div>
				<div className={styles.time__container}>
					<div className={styles.time}>
						<span>{dateStore.dateL.split(' ').slice(1, 4).join(' ')}</span>
						<TimePicker
							className={'time'}
							defaultValue={dayjs(dateStore.dateM + dateStore.timeM)}
							format={'HH:mm'}
							onChange={onChangeTime}
						/>
					</div>
					<div className={styles.button__and__alert}>
						{alert === '' ? <></> : <div className={styles.alert}>{alert}</div>}
						<button onClick={onSaveClick} className={styles.button__create}>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default observer(DateModal);
