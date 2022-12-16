import { observer } from 'mobx-react-lite';
import { dayStore } from '../../stores/daysStore';
import Filter from '../filter/filter';
import styles from './header.module.scss';

type HeaderProps = {
	text: string;
	type: string;
};

const months = [
	'0',
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

const Header = ({ text, type }: HeaderProps) => {
	return (
		<div className={styles.container}>
			<div style={{display: 'flex'}}>
				<div className={styles.text}>{text}</div>
				{type === 'post' ? (
					<div className={styles.date}>
						<button
							className={styles.pre}
							onClick={() => {
								dayStore.changeDateForPost(false);
							}}
						></button>
						<div>
							{months[dayStore.dateForPosts.month] +
								' ' +
								dayStore.dateForPosts.year}
						</div>
						<button
							className={styles.next}
							onClick={() => {
								dayStore.changeDateForPost(true);
							}}
						></button>
					</div>
				) : (
					<></>
				)}
			</div>
			{type === 'project' ? <></> : <Filter />}
		</div>
	);
};

export default observer(Header);
