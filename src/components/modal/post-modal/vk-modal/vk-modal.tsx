import { useState } from 'react';
import styles from './vk-modal.module.scss';
import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../../stores/modalStore';
import axios from 'axios';
import { tokenStore } from '../../../../stores/tokenStore';
import { oneProjectStore } from '../../../../stores/oneProjectStore';

function VkModal() {
	const [valid, setValid] = useState(true);
	const [valueLink, setValueLink] = useState('');
	const [valueToken, setValueToken] = useState('');

	async function buttonClick(e: any) {
		e.preventDefault();
		const re = /^.{1,}$/;
		if (!re.test(valueLink) || !re.test(valueToken)) {
			setValid(false);
		} else {
			await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}api/soc/add`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
					projectid: oneProjectStore.activeProject.id,
					socnet: 'vk',
					link: valueLink,
					token: valueToken,
				},
			})
				.then(respone => {
					console.log(respone);
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
			modalStore.changeAddVk();
			modalStore.changeModalVk();
			setValueLink('');
			setValueToken('');
			setValid(true);
		}
	}

	function changeValueLink(e: any) {
		setValueLink(e.target.value);
	}

	function changeValueToken(e: any) {
		setValueToken(e.target.value);
	}

	if (!modalStore.modalVk) return null;

	return (
		<>
			<div
				onClick={() => modalStore.changeModalVk()}
				className={styles.black}
			></div>
			<form className={styles.container}>
				<div className={styles.head}>Подключение канала в VK</div>
				<div className={styles.input__container}>
					<span className={styles.input__text}>
						id сообщества или страницы
						<span className={styles.pattern}>1234(-1234 для сообщества)</span>
					</span>
					<input
						type='text'
						pattern='.{1,}'
						value={valueLink}
						onChange={changeValueLink}
						className={valid ? styles.input : styles.input__invalid}
						required
					/><a className={styles.buttons__token} target="_blank" href={`https://oauth.vk.com/authorize?client_id=6121396&scope=501202911&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1`}>
						Получить токен
					</a>
				</div>
				<div className={styles.input__container}>
					<span className={styles.input__text}>
						Токен, полученный на открытой странице
						<span className={styles.pattern}>
						vk1.a.l9Fa_________
						</span>
					</span>
					<input
						type='text'
						pattern='.{1,}'
						value={valueToken}
						onChange={changeValueToken}
						className={valid ? styles.input : styles.input__invalid}
						required
					/>
				</div>
				<div className={styles.buttons}>
					<button
						onClick={() => modalStore.changeModalVk()}
						className={styles.buttons__close}
					>
						Закрыть
					</button>
					<button onClick={buttonClick} className={styles.buttons__create}>
						Создать
					</button>
				</div>
			</form>
		</>
	);
}

export default observer(VkModal);
