import { NavLink } from 'react-router-dom';
import HomeHeader from '../../components/headers/homeHeader/homeHeader';
import styles from './Homepage.module.scss';

function Authpage() {
	return (
		<div className={styles.container}>
			<HomeHeader />
			<section className={styles.main__section}>
				<div className={styles.auth__section}>
					<div className={styles.auth__content}>
						<h1 className={styles.title}>
							Помогаем работать быстрее и эффективней!
						</h1>
						<p className={styles.titel__content}>
							Отложенные посты сразу в несколько соцсетей, используя одну
							платформу.
						</p>
						<NavLink to={'/auth'}>
							<button className={styles.auth__button}>Начать работу</button>
						</NavLink>
					</div>
					<div className={styles.logo}></div>
				</div>
				<div className={styles.post__section}>
					<div className={styles.post__preview}></div>
					<div className={styles.post__content}>
						<h2 className={styles.post__title}>Постинг в разные соц.сети</h2>
						<p className={styles.post__text}>
							В одном окне Вы можете выбирать и подключать нужные Вам соц.сети и
							страницы.
							<br /> Оставлять комментарии, которые будут видны Вам и Вашей
							команде.
						</p>
					</div>
				</div>
				<div className={styles.analytics__section}>
					<div className={styles.analytics__content}>
						<h2 className={styles.analytics__title}>
							Просматривайте аналитику каждого поста
						</h2>
						<p className={styles.analytics__text}>
							Выбирайте промежуток, который Вас интересует и анализируйте.
							<br />
							Просмотры, лайки, комментарии помогут лучше понять вашу аудиторию
							и их вкусы.
						</p>
					</div>
					<div className={styles.analytics__preview}></div>
				</div>
				<div className={styles.coop__section}>
					<div className={styles.coop__preview}></div>
					<div className={styles.coop__content}>
						<h2 className={styles.coop__title}>Работайте в команде</h2>
						<p className={styles.coop__text}>
							Вы можете подключайте в проект только нужных Вам людей. Выбирайте
							их уровень доступа.
							<br />
							Работайте сообща, обсуждая каждый пост!
						</p>
					</div>
				</div>
				<div className={styles.mobile__section}>
					<div className={styles.mobile__preview}></div>
					<div className={styles.mobile__content}>
						<h2 className={styles.mobile__title}>Мобильное приложение</h2>
						<p className={styles.mobile__text}>
							Наша команда создала мобильное приложение, которое содержит полный
							функционал веб приложения.
						</p>
						<NavLink to={'/auth'}>
							<button className={styles.auth__button}>Начать работу</button>
						</NavLink>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Authpage;
