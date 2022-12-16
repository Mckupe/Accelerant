import { observer } from 'mobx-react-lite';
import { filterStore } from '../../stores/filterStore';
import { modalStore } from '../../stores/modalStore';
import styles from './filter.module.scss';
import Themes from './themes/themes';

const Filter = () => {
	return (
		<div
			onClick={() => {
				modalStore.changeModalFilterThemes();
			}}
			className={styles.container}
		>
			<span>Темы:</span>
			<div className={styles.filter}>
				<div className={styles.select}>
					<span>{filterStore.activeTheme.theme}</span>
				</div>
				<div className={styles.arrow}></div>
				<Themes />
			</div>
		</div>
	);
};

export default observer(Filter);
