import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../../stores/modalStore';
import { patternStore } from '../../../../stores/patternStore';
import { postStore } from '../../../../stores/postStore';
import styles from './patterns.module.scss';

function Patterns() {

	function onClickPattern(e: any) {
		const id = e.currentTarget.dataset.id;
		postStore.textPost = patternStore.getPattern(Number(id)).text;
		modalStore.changePatterns();
	}

	if (!modalStore.patterns) return null;

	return (
		<div className={styles.container}>
			{patternStore.arrayPatternData.map(
				(pattern: ObjectPattern, key: number) => {
					return (
						<div
							onClick={onClickPattern}
							data-id={pattern.id}
							className={styles.pattern}
							key={key}
						>
							<span>{pattern.name}</span>
						</div>
					);
				}
			)}
			<div onClick={() => {modalStore.changeModalPattern()}} className={styles.create__pattern}>
				<div className={styles.create}></div>
				<span>Создать шаблон</span>
			</div>
		</div>
	);
}

export default observer(Patterns);
