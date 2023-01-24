import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { observer } from 'mobx-react-lite';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/headers/header/header';
import Adder from '../../components/adder/adder';
import PatternModal from '../../components/modal/pattern-modal/pattern-modal';
import { modalStore } from '../../stores/modalStore';
import { patternStore } from '../../stores/patternStore';
import Pattern from '../../components/pattern/pattern';

function Projectpage() {
	const patterns = patternStore.arrayPatternData;

	useEffect(() => {
		async function patterns() {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_API_URL}api/pattern/get`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
			})
				.then(response => {
					patternStore.resetArray();
					response.data.patterns.map((pattern: ObjectPattern) => {
						patternStore.addPattern(pattern);
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
		patterns();
	}, [modalStore.addPattern]);

	return (
		<div className={styles.main__container}>
			<Menu />
			<div className={styles.container}>
				<Header text={'Шаблоны'} type='project' />
				<div className={styles.main}>
					<div className={styles.adder__and__projects}>
						<Adder text={'Новый шаблон'} type={'pattern'} />
						{patterns.map((pattern: ObjectPattern, key: number) => {
							return (
								<Pattern
									id={pattern.id}
									name={pattern.name}
									text={pattern.text}
									key={key}
								/>
							);
						})}
						<PatternModal />
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Projectpage);
