import { NavLink } from 'react-router-dom';
import styles from './homeHeader.module.scss';

const HomeHeader = () => {
	return (
		<header className={styles.container}>
			<span className={styles.logo}>Accelerant</span>
			<div className={styles.navbar}>
				<span>О нас</span>
				<span>Мобильное приложение</span>
				<NavLink className={styles.auth} to={'/auth'}>
					<span className={styles.auth}>Войти</span>
				</NavLink>
			</div>
		</header>
	);
};

export default HomeHeader;
