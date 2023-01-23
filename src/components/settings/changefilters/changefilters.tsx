import styles from './changefilters.module.scss';
import { useState } from 'react';
import AdderFilter from '../../adderfilter/adderfilter';
import { postStore } from '../../../stores/postStore';
import { modalStore } from '../../../stores/modalStore';
import axios from 'axios';
import { tokenStore } from '../../../stores/tokenStore';
import { oneProjectStore } from '../../../stores/oneProjectStore';
import { observer } from 'mobx-react-lite';
import ThemeModal from '../../modal/post-modal/theme-modal/theme-modal';

const Changefilters = () => {
	const [alert, setAlert] = useState('');
	const [value, setValue] = useState('');

	async function buttonClickDel(e: any) {
		postStore.activeThemeArray.map(async (theme: any, key: number) => {
			await axios({
				method: 'delete',
				url: 'http://localhost:5000/api/theme/delete',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
					projectid: oneProjectStore.activeProject.id,
					themeid: theme.id,
				},
			}).catch(error => {
				console.log(error.response.data.message);
			});
		});
	}

	function changeValue(e: any) {
		setValue(e.target.value);
	}

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.head__text}>Темы</div>
			</div>
			<div className={styles.main}>
				<div className={styles.themes__container}>
					{postStore.themeArray.length > 0
						? postStore.themeArray.map((theme: any, key: number) => {
								return (
									<div key={key} style={{ display: 'flex' }}>
										<input
											id={theme.id}
											type='checkbox'
											className={styles.theme__input}
											checked={
												postStore.activeThemeArray.includes(theme.id)
													? false
													: true
											}
											onChange={() => {}}
										/>
										<label
											data-id={theme.id}
											htmlFor={theme.id}
											className={styles.theme}
											style={{ backgroundColor: `#${theme.color}` }}
										>
											{theme.theme}
										</label>
									</div>
								);
						  })
						: null}
				</div>
				<div className={styles.buttons}>
					{postStore.themeArray.length > 0 ? (
						<>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									width: '270px',
								}}
							>
								<button
									onClick={buttonClickDel}
									className={styles.buttons__delete}
								>
									Удалить
								</button>
								<button
									onClick={() => {
										modalStore.changeModalTheme();
										modalStore.changeAddTheme();
									}}
									className={styles.buttons__add}
								>
									Добавить
								</button>
							</div>
							<button
								onClick={
									postStore.activeThemeArray.length != 0
										? () => {
												modalStore.changeModalTheme();
										  }
										: () => setAlert('Время публикации в прошлом.')
								}
								className={styles.buttons__reduct}
							>
								Редактировать
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => {
									modalStore.changeModalTheme();
									modalStore.changeAddTheme();
								}}
								className={styles.buttons__add}
							>
								Добавить
							</button>
						</>
					)}
				</div>
			</div>
			<ThemeModal />
		</div>
	);
};

export default observer(Changefilters);
