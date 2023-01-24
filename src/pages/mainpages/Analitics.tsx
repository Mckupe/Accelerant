import { observer } from 'mobx-react-lite';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/headers/header/header';
import Views from '../../components/analitics/views/views';
import Likes from '../../components/analitics/likes/likes';
import Coments from '../../components/analitics/coments/coments';

function Projectpage() {
	return (
		<div className={styles.main__container}>
			<Menu />
			<div className={styles.container}>
				<Header text={'Аналитика'} type={'analytics'} />
				<div className={styles.main}>
					<div className={styles.settings}>
						<Views />
						<Likes />
						<Coments />
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Projectpage);
