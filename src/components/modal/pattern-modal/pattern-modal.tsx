import axios from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../../stores/tokenStore';
import styles from './pattern-modal.module.scss';
import { modalStore } from '../../../stores/modalStore';
import { observer } from 'mobx-react-lite';
import { patternStore } from '../../../stores/patternStore';

function PatternModal() {
	const [valid, setValid] = useState(true);

	async function buttonClick(e: any) {
		e.preventDefault();
		const re = /^.{1,}$/;
		if (!re.test(patternStore.activePattern.name)) {
			setValid(false);
		} else {
			setValid(true);
			const data = {
				name: patternStore.activePattern.name,
				text: patternStore.activePattern.text,
			};
			await axios({
				method: `${modalStore.updatePattern ? 'put' : 'post'}`,
				url: `http://localhost:5000/api/pattern/${
					modalStore.updatePattern ? 'update' : 'add'
				}`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: modalStore.updatePattern
					? { ...data, patternid: patternStore.activePattern.id, nameText: patternStore.activePattern.nameText }
					: data,
			}).catch(error => {
				return console.log(error.response.data.message);
			});
			resetAll();
			modalStore.changeAddPattern();
		}
	}

	function resetAll() {
		patternStore.activePattern = patternStore.resetActivePattern();
		setValid(true);
		modalStore.changeModalPattern();
		if (modalStore.updatePattern) modalStore.changeUpdatePattern();
	}

	if (!modalStore.modalPattern) return null;

	return (
		<>
			<div onClick={resetAll} className={styles.black}></div>
			<form className={styles.container}>
				<div className={styles.head}>
					{modalStore.updatePattern ? patternStore.activePattern.name : 'Новый шаблон'}
				</div>
				<div className={styles.input__container}>
					<div className={styles.input__text}>Название</div>
					<input
						type='text'
						pattern='.{1,}'
						value={patternStore.activePattern.name}
						onChange={(e: any) =>
							(patternStore.activePattern.name = e.target.value)
						}
						className={valid ? styles.input : styles.input__invalid}
						required
					/>
				</div>
				<div className={styles.input__container}>
					<div className={styles.input__text}>Текст шаблона</div>
					<textarea
						value={patternStore.activePattern.text}
						onChange={(e: any) =>
							(patternStore.activePattern.text = e.target.value)
						}
						className={styles.textarea}
						required
					/>
				</div>
				<div className={styles.buttons}>
					<button onClick={resetAll} className={styles.buttons__close}>
						Закрыть
					</button>
					<button onClick={buttonClick} className={styles.buttons__create}>
						{modalStore.updatePattern ? 'Сохранить' : 'Создать'}
					</button>
				</div>
			</form>
		</>
	);
}

export default observer(PatternModal);
