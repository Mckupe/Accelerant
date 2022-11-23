import styles from './authorization.module.scss';
import { userStore } from '../../stores/userdataStore';
import { observer } from 'mobx-react-lite';

type AuthProps = {
	panel: string;
	eye: string;
	changePanel: React.MouseEventHandler<HTMLButtonElement>;
	changeEye: React.MouseEventHandler<HTMLButtonElement>;
	buttonClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Authorization = ({
	panel,
	changePanel,
	eye,
	changeEye,
	buttonClick,
}: AuthProps) => {
	const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		userStore.changeName(event.target.value);
	};

	const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		userStore.changeEmail(event.target.value);
	};

	const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		userStore.changePassword(event.target.value);
	};

	return (
		<form
			className={styles.auth__container}
			style={{ height: panel === 'auth' ? '773px' : '843px' }}
		>
			<span className={styles.container__text}>
				{panel === 'auth' ? 'Войти' : 'Регистрация'}
			</span>
			{panel === 'auth' ? (
				<div style={{ display: 'none' }} />
			) : (
				<div className={styles.container__input}>
					<span className={styles.input__text}>Имя пользователя</span>
					<input
						type='text'
						value={userStore.userdata.name}
						onChange={changeName}
						className={styles.input}
						required
					/>
				</div>
			)}
			<div className={styles.container__input}>
				<span className={styles.input__text}>Email</span>
				<input
					type='email'
					value={userStore.userdata.email}
					onChange={changeEmail}
					className={
						userStore.datavalid.validEmail
							? styles.input
							: styles.input__invalid
					}
					pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
					required
				/>
			</div>
			<div className={styles.container__input}>
				<span className={styles.input__text}>Пароль</span>
				<input
					type={eye}
					value={userStore.userdata.password}
					onChange={changePassword}
					className={
						userStore.datavalid.validPassword
							? styles.input
							: styles.input__invalid
					}
					pattern='.{8,}'
					required
				/>
				<span className={styles.eye} onClick={changeEye} />
			</div>
			<div
				className={styles.container__check}
				style={{ display: panel === 'auth' ? 'flex' : 'none' }}
			>
				<div className={styles.check__checkbox}>
					<div>
						<input type='checkbox' className={styles.check} />
						<label />
					</div>
					<span className={styles.check__text}>Запомнить меня</span>
				</div>
				<a href='/' className={styles.check__forgot}>
					Забыли пароль?
				</a>
			</div>
			<button
				className={styles.container__button}
				onClick={buttonClick}
				style={{ marginTop: panel === 'auth' ? '0px' : '36px' }}
			>
				{panel === 'auth' ? 'Войти в Accelerant' : 'Зарегистрироваться'}
			</button>
			<span className={styles.container__br}>или войти через</span>
			<div className={styles.container__socnet}>
				<a className={styles.socnet__vk} href='/'></a>
				<a className={styles.socnet__tg} href='/'></a>
			</div>
			{panel === 'auth' ? (
				<span className={styles.container__footer}>
					Еще нет аккаунта?{' '}
					<span onClick={changePanel}>Зарегистрироваться</span>
				</span>
			) : (
				<span className={styles.container__footer}>
					Уже зарегистрированы? <span onClick={changePanel}>Войти</span>
				</span>
			)}
		</form>
	);
};

export default observer(Authorization);
