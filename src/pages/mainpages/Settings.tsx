import axios from 'axios';
import { tokenStore } from '../../stores/tokenStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/headers/header/header';
import Changename from '../../components/settings/changename/changename';
import Changefilters from '../../components/settings/changefilters/changefilters';
import Сhangesoc from '../../components/settings/changesoc/changesoc';
import { oneProjectStore } from '../../stores/oneProjectStore';
import { postStore } from '../../stores/postStore';
import { modalStore } from '../../stores/modalStore';

function Settingspage() {
	const navigate = useNavigate();

	useEffect(() => {
		async function getThemeData() {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_API_URL}api/theme/get`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				params: { projectid: oneProjectStore.activeProject.id },
			})
				.then(response => {
					postStore.addThemeArray(response.data.themes);
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
		}
		getThemeData();
	}, [modalStore.addTheme]);

	const sas = async function name(e: any) {
		e.preventDefault();
		await axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/project/delete`,
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			data: {
				projectid: oneProjectStore.activeProject.id,
			},
		})
			.then(response => {
				return console.log(response.data);
			})
			.catch(error => {
				return console.log(error.response.data.message);
			});
		navigate('/project');
	};

	return (
		<div className={styles.main__container}>
			<Menu />
			<div className={styles.container}>
				<Header text={'Настройки проекта'} type={'settings'} />
				<div className={styles.main}>
					<div className={styles.settings}>
						<Changename />
						<Changefilters />
						<Сhangesoc />
						<button onClick={sas} className={styles.button}>
							Удалить проект
						</button>{' '}
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Settingspage);
