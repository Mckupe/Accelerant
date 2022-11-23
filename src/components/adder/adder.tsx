import styles from './adder.module.scss';
import { modalStore } from '../../stores/modalStore';

type AdderProps = {
	text: string;
	type: string;
};

const Adder = ({ text, type }: AdderProps) => {
	return (
		<div
			onClick={() => type == 'project' ? modalStore.changeModalProject() : modalStore.changeModalPost()}
			className={styles.container}
		>
			<div className={styles.plus} />
			<div className={styles.container__text}>{text}</div>
		</div>
	);
};

export default Adder;
