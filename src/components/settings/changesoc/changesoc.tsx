import styles from './changesoc.module.scss';
import { useState } from 'react';
import { oneProjectStore } from '../../../stores/oneProjectStore';
import { postStore } from '../../../stores/postStore';
import { tokenStore } from '../../../stores/tokenStore';
import { modalStore } from '../../../stores/modalStore';
import TgModal from '../../modal/post-modal/tg-modal/tg-modal';
import VkModal from '../../modal/post-modal/vk-modal/vk-modal';
import axios from 'axios';
import { observer } from 'mobx-react-lite';

const Сhangesoc = () => {
	const [valid, setValid] = useState(true);
	const [value, setValue] = useState('');
	const [valueLink, setValueLink] = useState('');
	const [valueToken, setValueToken] = useState('');

	async function delSoc(e: any) {
		e.preventDefault();
		const re = /^.{1,}$/;
		if (!re.test(valueLink) || !re.test(valueToken)) {
			setValid(false);
		} else {
			await axios({
				method: 'delete',
				url: `${process.env.REACT_APP_API_URL}api/soc/deleteSoc`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
					socid: oneProjectStore.activeProject.id,
				},
			})
				.then(respone => {
					console.log(respone);
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
			modalStore.changeAddTg();
			modalStore.changeModalTg();
			setValueLink('');
			setValueToken('');
			setValid(true);
		}
	}

	async function addSoc(e: any) {}

	function changeValue(e: any) {
		setValue(e.target.value);
	}

	const socetArray = postStore.socArray.map(({ socnet }) => socnet);

	return (
		<div className={styles.container}>
			<TgModal />
			<VkModal />
			<div className={styles.head}>
				<div className={styles.head__text}>Управление соцсетями</div>
			</div>
			<div className={styles.main}>
				<div className={styles.logoandtext__block}>
					<span className={styles.vk}></span>
					<div className={styles.menu_text}>Вконтакте</div>
					{socetArray.includes('vk') ? (
						<>
							<button onClick={delSoc} className={styles.button}>
								Удалить
							</button>
						</>
					) : (
						<button
							onClick={() => modalStore.changeModalVk()}
							className={styles.button}
						>
							Подключить
						</button>
					)}
				</div>
				<div className={styles.logoandtext__block}>
					<span className={styles.tg}></span>
					<div className={styles.menu_text}>Телеграмм</div>
					{socetArray.includes('telega') ? (
						<>
							<button onClick={addSoc} className={styles.button}>
								Удалить
							</button>
						</>
					) : (
						<button
							onClick={() => modalStore.changeModalTg()}
							className={styles.button}
						>
							Подключить
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default observer(Сhangesoc);
