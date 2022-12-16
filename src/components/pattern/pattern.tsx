import styles from './pattern.module.scss';
import { observer } from 'mobx-react-lite';
import { patternStore } from '../../stores/patternStore';
import { modalStore } from '../../stores/modalStore';

type PatternProps = {
	id: number;
	name: string;
	text: string;
};

const Pattern = ({ id, name, text }: PatternProps) => {
	function onClickPattern(e: any) {
		const id = e.currentTarget.dataset.id;
		patternStore.changeActivePattern(patternStore.getPattern(Number(id)));
		modalStore.changeUpdatePattern();
		modalStore.changeModalPattern();
	}

	return (
		<div
			onClick={onClickPattern}
			data-name={name}
			data-id={id}
			className={styles.container}
		>
			<div className={styles.head}>
				<div className={styles.head__text}>{name}</div>
			</div>
			<div className={styles.main}>{text}</div>
		</div>
	);
};

export default observer(Pattern);
