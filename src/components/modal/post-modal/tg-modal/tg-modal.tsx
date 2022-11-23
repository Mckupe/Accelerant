import { useState } from 'react';
import styles from './tg-modal.module.scss';
import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../../stores/modalStore';
import axios from 'axios';
import { tokenStore } from '../../../../stores/tokenStore';
import { oneProjectStore } from '../../../../stores/oneProjectStore';

function TgModal() {
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
				url: 'http://localhost:5000/api/soc/add',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
					projectid: oneProjectStore.activeProject.id,
					socnet: 'telega',
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
			modalStore.changeAddTg();
			modalStore.changeModalTg();
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

	if (!modalStore.modalTg) return null;

	return (
		<>
			<div
				onClick={() => modalStore.changeModalTg()}
				className={styles.black}
			></div>
			<form className={styles.container}>
				<div className={styles.head}>Подключение канала в Telegram</div>
				<div className={styles.input__container}>
					<span className={styles.input__text}>
						Ссылка на канал, вида
						<span className={styles.pattern}>@example</span>
					</span>
					<input
						type='text'
						pattern='.{1,}'
						value={valueLink}
						onChange={changeValueLink}
						className={valid ? styles.input : styles.input__invalid}
						required
					/>
				</div>
				<div className={styles.input__container}>
					<span className={styles.input__text}>
						Токен бота, вида
						<span className={styles.pattern}>
							1234512345:QWERTYUIO-QWERTYUIOP
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
						onClick={() => modalStore.changeModalTg()}
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

export default observer(TgModal);
