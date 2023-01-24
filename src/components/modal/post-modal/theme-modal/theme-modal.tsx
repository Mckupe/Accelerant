import axios from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../../../stores/tokenStore';
import styles from './theme-modal.module.scss';
import { modalStore } from '../../../../stores/modalStore';
import { observer } from 'mobx-react-lite';
import { oneProjectStore } from '../../../../stores/oneProjectStore';

function ThemeModal() {
	const [valid, setValid] = useState(true);
	const [value, setValue] = useState('');
	const [color, setColor] = useState('');
	const [alert, setAlert] = useState('');

	async function buttonClick(e: any) {
		e.preventDefault();
		const re = /^.{1,20}$/;
		if (!re.test(value)) {
			setValid(false);
		} else if (color === '') {
			setAlert('Выберете цвет!');
		} else {
			await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}api/theme/add`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
					projectid: oneProjectStore.activeProject.id,
					text: value,
					color: color,
				},
			}).catch(error => {
				console.log(error.response.data.message);
			});
			modalStore.changeAddTheme();
			modalStore.changeModalTheme();
			setColor('');
			setValue('');
			setValid(true);
		}
	}

	function changeValue(e: any) {
		setValue(e.target.value);
	}

	function onColorClick(e: any) {
		setAlert('');
		setColor(e.target.dataset.color);
	}

	if (!modalStore.modalTheme) return null;

	return (
		<>
			<div
				onClick={() => {
					modalStore.changeModalTheme();
					setColor('');
					setValue('');
					setValid(true);
				}}
				className={styles.black}
			></div>
			<form className={styles.container}>
				<div className={styles.head}>Новая тема</div>
				{alert === '' ? <></> : <div className={styles.alert}>{alert}</div>}
				<div className={styles.input__container}>
					<div className={styles.input__text}>Название</div>
					<input
						type='text'
						pattern='.{1,20}'
						value={value}
						onChange={changeValue}
						className={valid ? styles.input : styles.input__invalid}
						required
					/>
				</div>
				<div className={styles.color__container}>
					<div className={styles.input__text}>Цвет</div>
					<div onClick={onColorClick} className={styles.color__select}>
						<input
							type='radio'
							data-color='EE3030'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#EE3030' }}
						/>
						<input
							type='radio'
							data-color='AF7010'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#AF7010' }}
						/>
						<input
							type='radio'
							data-color='EE9630'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#EE9630' }}
						/>
						<input
							type='radio'
							data-color='EEDB30'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#EEDB30' }}
						/>
						<input
							type='radio'
							data-color='78EE30'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#78EE30' }}
						/>
						<input
							type='radio'
							data-color='30EE65'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#30EE65' }}
						/>
						<input
							type='radio'
							data-color='30EEE3'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#30EEE3' }}
						/>
						<input
							type='radio'
							data-color='3093EE'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#3093EE' }}
						/>
						<input
							type='radio'
							data-color='3F30EE'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#3F30EE' }}
						/>
						<input
							type='radio'
							data-color='9A52F4'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#9A52F4' }}
						/>
						<input
							type='radio'
							data-color='F63AFA'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#F63AFA' }}
						/>
						<input
							type='radio'
							data-color='EF236C'
							name='color'
							className={styles.color}
							style={{ backgroundColor: '#EF236C' }}
						/>
					</div>
				</div>
				<div className={styles.buttons}>
					<button
						onClick={() => {
							modalStore.changeModalTheme();
							setColor('');
							setValue('');
							setValid(true);
						}}
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

export default observer(ThemeModal);
